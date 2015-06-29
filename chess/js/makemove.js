function ClearPiece(sq) {
	var piece = GameBoard.pieces[sq];
	var colour = PieceCol[piece];
	var index;
	var t_pieceNumber = -1;

	HASH_PIECE(piece, sq);

	GameBoard.pieces[sq] = PIECES.EMPTY;
	GameBoard.material[colour] -= PieceVal[piece];

	for (index = 0; index < GameBoard.pieceNum[piece]; ++index) {
		if (GameBoard.pList[PIECEINDEX(piece, index)] == sq) {
			t_pieceNumber = index;
			break;
		}
	}

	GameBoard.pieceNum[piece]--;
	GameBoard.pList[PIECEINDEX(piece, t_pieceNumber)] = GameBoard.pList[PIECEINDEX(piece, GameBoard.pieceNum[piece])];
}

function AddPiece(sq, piece) {
	var colour = PieceCol[piece];
	
	HASH_PIECE(piece, sq);
	
	GameBoard.pieces[sq] = piece;
	GameBoard.material[colour] += PieceVal[piece];
	GameBoard.pList[PIECEINDEX(piece, GameBoard.pieceNum[piece])] = sq;
	GameBoard.pieceNum[piece]++;
}

function MovePiece(from, to) {
	var index = 0;
	var piece = GameBoard.pieces[from];

	HASH_PIECE(piece, from);
	GameBoard.pieces[from] = PIECES.EMPTY;

	HASH_PIECE(piece, to);
	GameBoard.pieces[to] = piece;

	for (index = 0; index < GameBoard.pieceNum[piece]; ++index) {
		if (GameBoard.pList[PIECEINDEX(piece, index)] == from) {
			GameBoard.pList[PIECEINDEX(piece, index)] = to;
			break;
		}
	}
}

function MakeMove(move) {
	var from = FROMSQ(move);
	var to = TOSQ(move);
	var side = GameBoard.side;

	GameBoard.history[GameBoard.hisPly].posKey = GameBoard.posKey;

	if ((move & MOVEFLAGEP) != 0) {
		if (side == COLOURS.WHITE) {
			ClearPiece(to - 10);
		}
		else {
			ClearPiece(to + 10);
		}
	}
	else if ((move & MOVEFLAGCA) != 0) {
		switch(to) {
			case SQUARES.C1:
				MovePiece(SQUARES.A1, SQUARES.D1);
				break;
			case SQUARES.C8:
				MovePiece(SQUARES.A8, SQUARES.D8);
				break;
			case SQUARES.G1:
				MovePiece(SQUARES.H1, SQUARES.F1);
				break;
			case SQUARES.G8:
				MovePiece(SQUARES.H8, SQUARES.F8);
				break;
			default:
				break;
		}
	}

	if (GameBoard.enPas != SQUARES.NO_SQ) {
		HASH_EP();
	}

	HASH_CA();

	GameBoard.history[GameBoard.hisPly].move = move;
	GameBoard.history[GameBoard.hisPly].fiftyMove = GameBoard.fiftyMove;
	GameBoard.history[GameBoard.hisPly].enPas = GameBoard.enPas;
	GameBoard.history[GameBoard.hisPly].castlePerm = GameBoard.castlePerm;

	GameBoard.castlePerm &= CastlePerm[from];
	GameBoard.castlePerm &= CastlePerm[to];
	GameBoard.enPas = SQUARES.NO_SQ;

	HASH_CA();

	var captured = CAPTURED(move);

	GameBoard.fiftyMove++;

	if (captured != PIECES.EMPTY) {
		ClearPiece(to);
		GameBoard.fiftyMove = 0;
	}

	GameBoard.hisPly++;
	GameBoard.ply++;

	if (PiecePawn[GameBoard.pieces[from]] == BOOL.TRUE) {
		GameBoard.fiftyMove = 0;
		if ((move & MOVEFLAGPS) != 0) {
			if (side == COLOURS.WHITE) {
				GameBoard.enPas = from + 10;
			}
			else {
				GameBoard.enPas = from - 10;
			}
			HASH_EP();
		}
	}

	MovePiece(from, to);

	var promPiece = PROMOTED(move);

	if (promPiece != PIECES.EMPTY) {
		ClearPiece(to);
		AddPiece(to, promPiece);
	}

	GameBoard.side ^= 1;
	HASH_SIDE();

	if (SqAttacked(GameBoard.pList[PIECEINDEX(Kings[side],0)], GameBoard.side)) {
		TakeMove();
		return BOOL.FALSE;
	}
	return BOOL.TRUE;

}

function TakeMove() {
	GameBoard.hisPly--;
	GameBoard.ply--;

	var move = GameBoard.history[GameBoard.hisPly].move;
	var from = FROMSQ(move);
	var to = TOSQ(move);

	if (GameBoard.enPas != SQUARES.NO_SQ) HASH_EP();
	
	HASH_CA();

	GameBoard.castlePerm = GameBoard.history[GameBoard.hisPly].castlePerm;
	GameBoard.fiftyMove = GameBoard.history[GameBoard.hisPly].fiftyMove;
	GameBoard.enPas = GameBoard.history[GameBoard.hisPly].enPas;

	if (GameBoard.enPas != SQUARES.NO_SQ) {
		HASH_EP();
	}

	HASH_CA();
	GameBoard.side ^= 1;
	HASH_SIDE();

	if ((MOVEFLAGEP & move) != 0) {
		if (GameBoard.side == COLOURS.WHITE) {
			AddPiece(to - 10, PIECES.bP);
		}
		else {
			AddPiece(to + 10, PIECES.wP);
		}
	}
	else if ((MOVEFLAGCA & move) != 0) {
		switch(to) {
			case SQUARES.C1: 
				MovePiece(SQUARES.D1, SQUARES.A1);
				break;
			case SQUARES.C8: 
				MovePiece(SQUARES.D8, SQUARES.A8);
				break;
			case SQUARES.G1: 
				MovePiece(SQUARES.F1, SQUARES.H1);
				break;
			case SQUARES.G8: 
				MovePiece(SQUARES.F8, SQUARES.H8);
				break;
			default:
				break;
		}
	}

	MovePiece(to, from);

	var captured = CAPTURED(move);

	if (captured != PIECES.EMPTY) {
		AddPiece(to, captured);
	}

	if (PROMOTED(move) != PIECES.EMPTY) {
		ClearPiece(from);
		AddPiece(from, (PieceCol[PROMOTED(move)] == COLOURS.WHITE ? PIECES.wP : PIECES.bP));
	}

}

