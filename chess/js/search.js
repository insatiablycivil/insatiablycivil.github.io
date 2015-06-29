var SearchController = {};

SearchController.nodes;
SearchController.fh;
SearchController.fhf;
SearchController.depth;
SearchController.time;
SearchController.start;
SearchController.stop;
SearchController.best;
SearchController.thinking;

function PickNextMove(moveNum) {
	var index = 0;
	var bestScore = -1;
	var bestNum = moveNum;

	for (index = moveNum; index < GameBoard.moveListStart[GameBoard.ply + 1]; ++index) {
		if (GameBoard.moveScores[index] > bestScore) {
			bestScore = GameBoard.moveScores[index];
			bestNum = index;
		}
	}

	if (bestNum != moveNum) {
		var temp = 0;
		temp = GameBoard.moveScores[moveNum];
		GameBoard.moveScores[moveNum] = GameBoard.moveScores[bestNum];
		GameBoard.moveScores[bestNum] = temp;

		temp = GameBoard.moveList[moveNum];
		GameBoard.moveList[moveNum] = GameBoard.moveList[bestNum];
		GameBoard.moveList[bestNum] = temp;
	}
}

function ClearPvTable() {
	for (index = 0; index < PVENTRIES; index++) {
		GameBoard.PvTable[index].move = NOMOVE;
		GameBoard.PvTable[index].posKey = 0;
	}
}

function CheckUp() {
	if (($.now() - SearchController.start) > SearchController.time) {
		SearchController.stop = BOOL.TRUE;
	}
}

function IsRepetition() {
	var index = 0;

	for (index = GameBoard.hisPly - GameBoard.fiftyMove; index < GameBoard.hisPly - 1; ++index){
		if (GameBoard.posKey == GameBoard.history[index].posKey) {
			return BOOL.TRUE;
		}
	}

	return BOOL.FALSE;
}

function Quiescence(alpha, beta) {
	if ((SearchController.nodes & 2047) == 0) {
		CheckUp();
	}

	SearchController.nodes++;

	if ((IsRepetition() || GameBoard.fiftyMove >= 100) && (GameBoard.ply != 0)) {
		return 0;
	}

	if (GameBoard.ply > MAXDEPTH - 1) {
		return EvalPosition();
	}

	var score = EvalPosition();
	if (score >= beta) {
		return beta;
	}

	if (score > alpha) {
		alpha = score;
	}

	GenerateCaptures();

	var moveNum = 0;
	var legal = 0;
	var oldAlpha = alpha;
	var bestMove = NOMOVE;
	var move = NOMOVE;

	// Get Priniciple Variation Move
	// Order PvMove

	for (moveNum = GameBoard.moveListStart[GameBoard.ply]; moveNum < GameBoard.moveListStart[GameBoard.ply + 1]; ++moveNum) {
		PickNextMove(moveNum);

		move = GameBoard .moveList[moveNum];

		if (MakeMove(move) == BOOL.FALSE) {
			continue;
		}

		legal++
		score = -Quiescence(-beta, -alpha);
		TakeMove();

		if (SearchController.stop == BOOL.TRUE) {
			return 0;
		}

		if (score > alpha) {
			if (score >= beta) {
				if (legal == 1) {
					SearchController.fhf++;
				}
				SearchController.fh++;
				return beta;
			}
			alpha = score;
			bestMove = move;
		}
	}

	if(alpha != oldAlpha) {
		StorePvMove(bestMove);
	}

	return alpha;


}

function AlphaBeta(alpha, beta, depth) {
	if (depth <= 0) {
		return Quiescence(alpha, beta);
	}

	if ((SearchController.nodes & 2047) == 0) {
		CheckUp();
	}

	SearchController.nodes++;

	if ((IsRepetition() || GameBoard.fiftyMove >= 100) && (GameBoard.ply != 0)) {
		return 0;
	}

	if (GameBoard.ply > MAXDEPTH - 1) {
		return EvalPosition();
	}

	var InCheck = SqAttacked(GameBoard.pList[PIECEINDEX(Kings[GameBoard.side], 0)], GameBoard.side^1);
	if (InCheck == BOOL.TRUE) {
		depth++;
	}


	var score = -INFINITE;

	GenerateMoves();

	var moveNum = 0;
	var legal = 0;
	var oldAlpha = alpha;
	var bestMove = NOMOVE;
	var move = NOMOVE;

	var PvMove = ProbePvTable();
	if (PvMove != NOMOVE) {
		for (moveNum = GameBoard.moveListStart[GameBoard.ply]; moveNum < GameBoard.moveListStart[GameBoard.ply + 1]; ++moveNum) {
			if (GameBoard.moveList[moveNum] == PvMove) {
				GameBoard.moveScores[moveNum] = 2000000;
				break;
			}
		}
	}

	for (moveNum = GameBoard.moveListStart[GameBoard.ply]; moveNum < GameBoard.moveListStart[GameBoard.ply + 1]; ++moveNum) {
		PickNextMove(moveNum);

		move = GameBoard.moveList[moveNum];

		if (MakeMove(move) == BOOL.FALSE) {
			continue;
		}

		legal++
		score = -AlphaBeta(-beta, -alpha, depth - 1);
		TakeMove();

		if (SearchController.stop == BOOL.TRUE) {
			return 0;
		}

		if (score > alpha) {
			if (score >= beta) {
				if (legal == 1) {
					SearchController.fhf++;
				}
				SearchController.fh++;
				if ((move & MOVEFLAGCAP) == 0) {
					GameBoard.searchKillers[MAXDEPTH + GameBoard.ply] =
						GameBoard.searchKillers[GameBoard.ply];
					GameBoard.searchKillers[GameBoard.ply] = move;
				}
				return beta;
			}

			if ((move & MOVEFLAGCAP) == 0) {
				GameBoard.searchHistory[GameBoard.pieces[FROMSQ(move)] * BRD_SQ_NUM + TOSQ(move)] +=
					depth * depth;
			}
			alpha = score;
			bestMove = move;

			// Update History Table
		}
	}

	if (legal == 0) {
		if (InCheck == BOOL.TRUE) {
			return -MATE + GameBoard.ply;
		}
		else {
			return 0;
		}
	}

	if(alpha != oldAlpha) {
		StorePvMove(bestMove);
	}

	return alpha;
}

function ClearforSearch() {
	var index = 0;
	var index2 = 0;

	for (index = 0; index < 14 * BRD_SQ_NUM; ++index) {

		GameBoard.searchHistory[index] = 0;
	}

	for (index = 0; index < 3 * MAXDEPTH; ++index) {
		GameBoard.searchKillers[index] = 0;
	}

	ClearPvTable();

	GameBoard.ply = 0;
	SearchController.nodes = 0;
	SearchController.fh = 0;
	SearchController.fhf = 0;
	SearchController.start = $.now();
	SearchController.stop = BOOL.FALSE;
}

function SearchPosition() {
	var bestMove = NOMOVE;
	var bestScore = -INFINITE;
	var Score = -INFINITE;
	var currentDepth = 0;
	var line;
	var PvNum;
	var c;

	ClearforSearch();

	for (currentDepth = 1; currentDepth <= SearchController.depth; ++currentDepth) {

		Score = AlphaBeta(-INFINITE, INFINITE, currentDepth);


		if (SearchController.stop == BOOL.TRUE) {
			break;
		}

		bestScore = Score;
		bestMove = ProbePvTable();
		line = "Depth : " + currentDepth + " Best Move : " + PrintMove(bestMove) + 
			   " Score : " + bestScore + " Nodes Searched : " + SearchController.nodes;
		PvNum = GetPvLine(currentDepth);
		line += " Pv : ";

		for (c = 0; c < PvNum; ++c) {
			line += " " + PrintMove(GameBoard.PvArray[c]);
		}
		if (currentDepth != 1) {
			line += (" Ordering : " + ((SearchController.fhf / SearchController.fh) * 100).toFixed(2) + "%");
		}

		console.log(line);
	}

	SearchController.best = bestMove;
	SearchController.thinking = BOOL.FALSE;
	UpdateDOMStats(bestScore, currentDepth);
}

function UpdateDOMStats(dom_score, dom_depth) {
	var scoreText = "Score : " + (dom_score / 100).toFixed(2);
	if(Math.abs(dom_score) > MATE - MAXDEPTH) {
		scoreText = "Score : Mate In " + (MATE - Math.abs(dom_score)-1) + " Moves";
	}

	$("#OrderingOut").text("Ordering : " + ((SearchController.fhf / SearchController.fh) * 100).toFixed(2) + "%");
	$("#DepthOut").text("Depth : " + dom_depth);
	$("#ScoreOut").text(scoreText);
	$("#NodesOut").text("Nodes : " + SearchController.nodes);
	$("#TimeOut").text("Time : " + (($.now() - SearchController.start) / 1000).toFixed(1) + "s");
	$("#BestOut").text("Best Move : " + PrintMove(SearchController.best));
}