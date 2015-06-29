var MvvLvaValue = [ 0, 100, 200, 300, 400, 500, 600, 100, 200, 300, 400, 500, 600 ];
var MvvLvaScores = new Array(14 * 14);

function InitMvvLva() {
	var attacker;
	var victim;

	for (attacker = PIECES.wP; attacker <= PIECES.bK; ++attacker) {
		for (victim = PIECES.wP; victim <= PIECES.bK; ++victim) {
			MvvLvaScores[victim * 14 + attacker] = MvvLvaValue[victim] + 6 - (MvvLvaValue[attacker] / 100)
		}
	}
}

function MoveExists(move) {

	GenerateMoves();

	var index;
	var moveFound = NOMOVE;
	for (index = GameBoard.moveListStart[GameBoard.ply]; index < GameBoard.moveListStart[GameBoard.ply + 1]; ++index) {
		moveFound = GameBoard.moveList[index];
		if (MakeMove(moveFound) == BOOL.FALSE) {
			continue;
		}
		TakeMove();
		if (move == moveFound) {
			return BOOL.TRUE;
		}
	}
	return BOOL.FALSE;
}

function MOVE(from, to, captured, promoted, flag) {
	return (from | (to << 7) | (captured << 14) | (promoted << 20) | flag);
}

function AddCaptureMove(move) {
	GameBoard.moveList[GameBoard.moveListStart[GameBoard.ply+1]] = move;
	GameBoard.moveScores[GameBoard.moveListStart[GameBoard.ply+1]++] = 
		MvvLvaScores[CAPTURED(move) * 14 + GameBoard.pieces[FROMSQ(move)]] + 1000000;
}

function AddQuietMove(move) {
	GameBoard.moveList[GameBoard.moveListStart[GameBoard.ply+1]] = move;
	GameBoard.moveScores[GameBoard.moveListStart[GameBoard.ply+1]] = 0;
	if (move == GameBoard.searchKillers[GameBoard.ply]) {
		GameBoard.moveScores[GameBoard.moveListStart[GameBoard.ply+1]] = 900000;
	}
	else if (move == GameBoard.searchKillers[GameBoard.ply + MAXDEPTH]) {
		GameBoard.moveScores[GameBoard.moveListStart[GameBoard.ply+1]] = 800000;
	}
	else {
		GameBoard.moveScores[GameBoard.moveListStart[GameBoard.ply+1]] =
			GameBoard.searchHistory[GameBoard.pieces[FROMSQ(move)] * BRD_SQ_NUM + TOSQ(move)];
	}

	GameBoard.moveListStart[GameBoard.ply+1]++;
}

function AddEnPasMove(move) {
	GameBoard.moveList[GameBoard.moveListStart[GameBoard.ply+1]] = move;
	GameBoard.moveScores[GameBoard.moveListStart[GameBoard.ply+1]++] = 105 + 1000000;
}

function AddwPCaptureMove(from, to, captured) {
	if (RanksBrd[from] == RANKS.RANK_7) {
		AddCaptureMove(MOVE(from, to, captured, PIECES.wQ, 0));
		AddCaptureMove(MOVE(from, to, captured, PIECES.wR, 0));
		AddCaptureMove(MOVE(from, to, captured, PIECES.wB, 0));
		AddCaptureMove(MOVE(from, to, captured, PIECES.wN, 0));
	}
	else {
		AddCaptureMove(MOVE(from, to, captured, PIECES.EMPTY, 0));
	}
}

function AddbPCaptureMove(from, to, captured) {
	if (RanksBrd[from] == RANKS.RANK_2) {
		AddCaptureMove(MOVE(from, to, captured, PIECES.bQ, 0));
		AddCaptureMove(MOVE(from, to, captured, PIECES.bR, 0));
		AddCaptureMove(MOVE(from, to, captured, PIECES.bB, 0));
		AddCaptureMove(MOVE(from, to, captured, PIECES.bN, 0));
	}
	else {
		AddCaptureMove(MOVE(from, to, captured, PIECES.EMPTY, 0));
	}
}

function AddwPQuietMove(from, to) {
	if (RanksBrd[from] == RANKS.RANK_7) {
		AddQuietMove(MOVE(from, to, PIECES.EMPTY, PIECES.wQ, 0));
		AddQuietMove(MOVE(from, to, PIECES.EMPTY, PIECES.wR, 0));
		AddQuietMove(MOVE(from, to, PIECES.EMPTY, PIECES.wB, 0));
		AddQuietMove(MOVE(from, to, PIECES.EMPTY, PIECES.wN, 0));		
	}
	else {
		AddQuietMove(MOVE(from, to, PIECES.EMPTY, PIECES.EMPTY, 0));	
	}
}

function AddbPQuietMove(from, to) {
	if (RanksBrd[from] == RANKS.RANK_2) {
		AddQuietMove(MOVE(from, to, PIECES.EMPTY, PIECES.bQ, 0));
		AddQuietMove(MOVE(from, to, PIECES.EMPTY, PIECES.bR, 0));
		AddQuietMove(MOVE(from, to, PIECES.EMPTY, PIECES.bB, 0));
		AddQuietMove(MOVE(from, to, PIECES.EMPTY, PIECES.bN, 0));		
	}
	else {
		AddQuietMove(MOVE(from, to, PIECES.EMPTY, PIECES.EMPTY, 0));	
	}
}


function GenerateMoves() {
	GameBoard.moveListStart[GameBoard.ply + 1] = GameBoard.moveListStart[GameBoard.ply];

	var pieceType;
	var pieceNum;
	var sq;
	var pieceIndex;
	var piece;
	var t_sq;
	var dir;

	if (GameBoard.side == COLOURS.WHITE) {
		pieceType = PIECES.wP;

		for (pieceNum = 0; pieceNum < GameBoard.pieceNum[pieceType]; ++pieceNum) {
			sq = GameBoard.pList[PIECEINDEX(pieceType, pieceNum)];

			if (GameBoard.pieces[sq + 10] == PIECES.EMPTY) {
				AddwPQuietMove(sq, sq + 10);
				if (RanksBrd[sq] == RANKS.RANK_2 && GameBoard.pieces[sq + 20] == PIECES.EMPTY) {
					AddQuietMove(MOVE(sq, sq + 20, PIECES.EMPTY, PIECES.EMPTY, MOVEFLAGPS));
				}
			}

			if (SQOFFBOARD(sq + 9) == BOOL.FALSE && PieceCol[GameBoard.pieces[sq + 9]] == COLOURS.BLACK) {
				AddwPCaptureMove(sq, sq + 9, GameBoard.pieces[sq + 9]);
			}

			if (SQOFFBOARD(sq + 11) == BOOL.FALSE && PieceCol[GameBoard.pieces[sq + 11]] == COLOURS.BLACK) {
				AddwPCaptureMove(sq, sq + 11, GameBoard.pieces[sq + 11]);
			}

			if (GameBoard.enPas != SQUARES.NOSQ) {
				if (sq + 9 == GameBoard.enPas) {
					AddEnPasMove(MOVE(sq, sq + 9, PIECES.EMPTY, PIECES.EMPTY, MOVEFLAGEP));
				}

				if (sq + 11 == GameBoard.enPas) {
					AddEnPasMove(MOVE(sq, sq + 11, PIECES.EMPTY, PIECES.EMPTY, MOVEFLAGEP));
				}
			}

		}

		if (GameBoard.castlePerm & CASTLEBIT.WKCA) {
			if (GameBoard.pieces[SQUARES.F1] == PIECES.EMPTY && 
				GameBoard.pieces[SQUARES.G1] == PIECES.EMPTY) {
					if (SqAttacked(SQUARES.F1, COLOURS.BLACK) == BOOL.FALSE && 
						SqAttacked(SQUARES.E1, COLOURS.BLACK) == BOOL.FALSE) {
							AddQuietMove(MOVE(SQUARES.E1, SQUARES.G1, PIECES.EMPTY, PIECES.EMPTY, MOVEFLAGCA));
					}
			}
		}

		if (GameBoard.castlePerm & CASTLEBIT.WQCA) {
			if (GameBoard.pieces[SQUARES.B1] == PIECES.EMPTY && 
				GameBoard.pieces[SQUARES.C1] == PIECES.EMPTY &&
				GameBoard.pieces[SQUARES.D1] == PIECES.EMPTY) {
					if (SqAttacked(SQUARES.E1, COLOURS.BLACK) == BOOL.FALSE && 
						SqAttacked(SQUARES.D1, COLOURS.BLACK) == BOOL.FALSE) {
							AddQuietMove(MOVE(SQUARES.E1, SQUARES.C1, PIECES.EMPTY, PIECES.EMPTY, MOVEFLAGCA));
					}
			}
		}
	}
	else {
		pieceType = PIECES.bP;

		for (pieceNum = 0; pieceNum < GameBoard.pieceNum[pieceType]; ++pieceNum) {
			sq = GameBoard.pList[PIECEINDEX(pieceType, pieceNum)];

			if (GameBoard.pieces[sq - 10] == PIECES.EMPTY) {
				AddbPQuietMove(sq, sq - 10);
				if (RanksBrd[sq] == RANKS.RANK_7 && GameBoard.pieces[sq - 20] == PIECES.EMPTY) {
					AddQuietMove(MOVE(sq, sq - 20, PIECES.EMPTY, PIECES.EMPTY, MOVEFLAGPS));
				}
			}

			if (SQOFFBOARD(sq - 9) == BOOL.FALSE && PieceCol[GameBoard.pieces[sq - 9]] == COLOURS.WHITE) {
				AddbPCaptureMove(sq, sq - 9, GameBoard.pieces[sq - 9]);
			}

			if (SQOFFBOARD(sq - 11) == BOOL.FALSE && PieceCol[GameBoard.pieces[sq - 11]] == COLOURS.WHITE) {
				AddbPCaptureMove(sq, sq - 11, GameBoard.pieces[sq -11]);
			}

			if (GameBoard.enPas != SQUARES.NO_SQ) {
				if (sq - 9 == GameBoard.enPas) {
					AddEnPasMove(MOVE(sq, sq - 9, PIECES.EMPTY, PIECES.EMPTY, MOVEFLAGEP));
				}

				if (sq - 11 == GameBoard.enPas) {
					AddEnPasMove(MOVE(sq, sq - 11, PIECES.EMPTY, PIECES.EMPTY, MOVEFLAGEP));
				}
			}
		}

		if (GameBoard.castlePerm & CASTLEBIT.BKCA) {
			if (GameBoard.pieces[SQUARES.F8] == PIECES.EMPTY && 
				GameBoard.pieces[SQUARES.G8] == PIECES.EMPTY) {
					if (SqAttacked(SQUARES.F8, COLOURS.WHITE) == BOOL.FALSE && 
						SqAttacked(SQUARES.E8, COLOURS.WHITE) == BOOL.FALSE) {
							AddQuietMove(MOVE(SQUARES.E8, SQUARES.G8, PIECES.EMPTY, PIECES.EMPTY, MOVEFLAGCA));
					}
			}
		}

		if (GameBoard.castlePerm & CASTLEBIT.BQCA) {
			if (GameBoard.pieces[SQUARES.B8] == PIECES.EMPTY && 
				GameBoard.pieces[SQUARES.C8] == PIECES.EMPTY &&
				GameBoard.pieces[SQUARES.D8] == PIECES.EMPTY) {
					if (SqAttacked(SQUARES.D8, COLOURS.WHITE) == BOOL.FALSE && 
						SqAttacked(SQUARES.E8, COLOURS.WHITE) == BOOL.FALSE) {
							AddQuietMove(MOVE(SQUARES.E8, SQUARES.C8, PIECES.EMPTY, PIECES.EMPTY, MOVEFLAGCA));
					}
			}
		}
	}

	pieceIndex = LoopNonSlideIndex[GameBoard.side];
	piece = LoopNonSlidePiece[pieceIndex++];

	while (piece != 0) {
		for (pieceNum = 0; pieceNum < GameBoard.pieceNum[piece]; ++pieceNum) {
			sq = GameBoard.pList[PIECEINDEX(piece, pieceNum)];

			for (index = 0; index < DirNum[piece]; index++) {
				dir = PieceDir[piece][index];
				t_sq = sq + dir;

				if (SQOFFBOARD(t_sq) == BOOL.TRUE) {
					continue;
				}

				if (GameBoard.pieces[t_sq] != PIECES.EMPTY) {
					if (PieceCol[GameBoard.pieces[t_sq]] != GameBoard.side) {
						AddCaptureMove(MOVE(sq, t_sq, GameBoard.pieces[t_sq], PIECES.EMPTY, 0));
					}
				}
				else {
					AddQuietMove(MOVE(sq, t_sq, PIECES.EMPTY, PIECES.EMPTY, 0));
				}
			}
		}
		piece = LoopNonSlidePiece[pieceIndex++];
	}

	pieceIndex = LoopSlideIndex[GameBoard.side];
	piece = LoopSlidePiece[pieceIndex++];

	while (piece != 0) {
		for (pieceNum = 0; pieceNum < GameBoard.pieceNum[piece]; ++pieceNum) {
			sq = GameBoard.pList[PIECEINDEX(piece, pieceNum)];

			for (index = 0; index < DirNum[piece]; index++) {
				dir = PieceDir[piece][index];
				t_sq = sq + dir;

				while (SQOFFBOARD(t_sq) == BOOL.FALSE) {
					if (GameBoard.pieces[t_sq] != PIECES.EMPTY) {
						if (PieceCol[GameBoard.pieces[t_sq]] != GameBoard.side) {
							AddCaptureMove(MOVE(sq, t_sq, GameBoard.pieces[t_sq], PIECES.EMPTY, 0));
						}
						break;
					}
					AddQuietMove(MOVE(sq, t_sq, PIECES.EMPTY, PIECES.EMPTY, 0));
					t_sq += dir;
				}
			}
		}
		piece = LoopSlidePiece[pieceIndex++];
	}
}

function GenerateCaptures() {
	GameBoard.moveListStart[GameBoard.ply + 1] = GameBoard.moveListStart[GameBoard.ply];

	var pieceType;
	var pieceNum;
	var sq;
	var pieceIndex;
	var piece;
	var t_sq;
	var dir;

	if (GameBoard.side == COLOURS.WHITE) {
		pieceType = PIECES.wP;

		for (pieceNum = 0; pieceNum < GameBoard.pieceNum[pieceType]; ++pieceNum) {
			sq = GameBoard.pList[PIECEINDEX(pieceType, pieceNum)];

			if (SQOFFBOARD(sq + 9) == BOOL.FALSE && PieceCol[GameBoard.pieces[sq + 9]] == COLOURS.BLACK) {
				AddwPCaptureMove(sq, sq + 9, GameBoard.pieces[sq + 9]);
			}

			if (SQOFFBOARD(sq + 11) == BOOL.FALSE && PieceCol[GameBoard.pieces[sq + 11]] == COLOURS.BLACK) {
				AddwPCaptureMove(sq, sq + 11, GameBoard.pieces[sq + 11]);
			}

			if (GameBoard.enPas != SQUARES.NO_SQ) {
				if (sq + 9 == GameBoard.enPas) {
					AddEnPasMove(MOVE(sq, sq + 9, PIECES.EMPTY, PIECES.EMPTY, MOVEFLAGEP));
				}

				if (sq + 11 == GameBoard.enPas) {
					AddEnPasMove(MOVE(sq, sq + 11, PIECES.EMPTY, PIECES.EMPTY, MOVEFLAGEP));
				}
			}

		}
	}
	else {
		pieceType = PIECES.bP;

		for (pieceNum = 0; pieceNum < GameBoard.pieceNum[pieceType]; ++pieceNum) {
			sq = GameBoard.pList[PIECEINDEX(pieceType, pieceNum)];

			if (SQOFFBOARD(sq - 9) == BOOL.FALSE && PieceCol[GameBoard.pieces[sq - 9]] == COLOURS.WHITE) {
				AddbPCaptureMove(sq, sq - 9, GameBoard.pieces[sq - 9]);
			}

			if (SQOFFBOARD(sq - 11) == BOOL.FALSE && PieceCol[GameBoard.pieces[sq - 11]] == COLOURS.WHITE) {
				AddbPCaptureMove(sq, sq - 11, GameBoard.pieces[sq -11]);
			}

			if (GameBoard.enPas != SQUARES.NOSQ) {
				if (sq - 9 == GameBoard.enPas) {
					AddEnPasMove(MOVE(sq, sq - 9, PIECES.EMPTY, PIECES.EMPTY, MOVEFLAGEP));
				}

				if (sq - 11 == GameBoard.enPas) {
					AddEnPasMove(MOVE(sq, sq - 11, PIECES.EMPTY, PIECES.EMPTY, MOVEFLAGEP));
				}
			}
		}
	}

	pieceIndex = LoopNonSlideIndex[GameBoard.side];
	piece = LoopNonSlidePiece[pieceIndex++];

	while (piece != 0) {
		for (pieceNum = 0; pieceNum < GameBoard.pieceNum[piece]; ++pieceNum) {
			sq = GameBoard.pList[PIECEINDEX(piece, pieceNum)];

			for (index = 0; index < DirNum[piece]; index++) {
				dir = PieceDir[piece][index];
				t_sq = sq + dir;

				if (SQOFFBOARD(t_sq) == BOOL.TRUE) {
					continue;
				}

				if (GameBoard.pieces[t_sq] != PIECES.EMPTY) {
					if (PieceCol[GameBoard.pieces[t_sq]] != GameBoard.side) {
						AddCaptureMove(MOVE(sq, t_sq, GameBoard.pieces[t_sq], PIECES.EMPTY, 0));
					}
				}
			}
		}
		piece = LoopNonSlidePiece[pieceIndex++];
	}

	pieceIndex = LoopSlideIndex[GameBoard.side];
	piece = LoopSlidePiece[pieceIndex++];

	while (piece != 0) {
		for (pieceNum = 0; pieceNum < GameBoard.pieceNum[piece]; ++pieceNum) {
			sq = GameBoard.pList[PIECEINDEX(piece, pieceNum)];

			for (index = 0; index < DirNum[piece]; index++) {
				dir = PieceDir[piece][index];
				t_sq = sq + dir;

				while (SQOFFBOARD(t_sq) == BOOL.FALSE) {
					if (GameBoard.pieces[t_sq] != PIECES.EMPTY) {
						if (PieceCol[GameBoard.pieces[t_sq]] != GameBoard.side) {
							AddCaptureMove(MOVE(sq, t_sq, GameBoard.pieces[t_sq], PIECES.EMPTY, 0));
						}
						break;
					}
					t_sq += dir;
				}
			}
		}
		piece = LoopSlidePiece[pieceIndex++];
	}
}