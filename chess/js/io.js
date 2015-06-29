function PrintSq(sq) {
	return (FileChar[FilesBrd[sq]] + RankChar[RanksBrd[sq]]);

}

function PrintMove(move) {
	var MoveString;
	var FileFrom = FilesBrd[FROMSQ(move)];
	var RankFrom = RanksBrd[FROMSQ(move)];
	var FileTo = FilesBrd[TOSQ(move)];
	var RankTo = RanksBrd[TOSQ(move)];

	MoveString = FileChar[FileFrom] + RankChar[RankFrom] + FileChar[FileTo] + RankChar[RankTo];

	var promoted = PROMOTED(move);

	if (promoted != PIECES.EMPTY) {
		var PrintChar = "q";
		if (PieceKnight[promoted] == BOOL.TRUE) {
			PrintChar = "n";
		}
		else if (PieceRookQueen[promoted] == BOOL.TRUE && PieceBishopQueen[promoted] == BOOL.FALSE) {
			PrintChar = "r";
		}
		else if (PieceRookQueen[promoted] == BOOL.FALSE && PieceBishopQueen[promoted] == BOOL.TRUE) {
			PrintChar = "b";
		}
		MoveString += PrintChar;
	}
	return MoveString;
}

function PrintMoveList() {
	var index;
	var move;
	var num = 1;
	console.log("MoveList");

	for (index = GameBoard.moveListStart[GameBoard.ply]; index < GameBoard.moveListStart[GameBoard.ply + 1]; ++index) {
		move = GameBoard.moveList[index];
		console.log("Move :" + num + " : " + PrintMove(move));
		num++;
	}
	console.log("End MoveList");
}

function ParseMove(from, to) {
	GenerateMoves();

	var Move = NOMOVE;
	var PromPiece = PIECES.EMPTY;
	var found = BOOL.FALSE;
	for (index = GameBoard.moveListStart[GameBoard.ply]; index < GameBoard.moveListStart[GameBoard.ply + 1]; ++index) {
		Move = GameBoard.moveList[index];
		if (FROMSQ(Move) == from && TOSQ(Move) == to) {
			PromPiece = PROMOTED(Move);
			if (PromPiece != PIECES.EMPTY) {
				if (PromPiece == PIECES.wQ && GameBoard.side == COLOURS.WHITE ||
					PromPiece == PIECES.bQ && GameBoard.side == COLOURS.BLACK) {
					found = BOOL.TRUE;
					break;
				}
				continue;
			}
			found = BOOL.TRUE;
			break;
		}
	}

	if (found != BOOL.FALSE) {
		if (MakeMove(Move) == BOOL.FALSE) {
			return NOMOVE;
		}
		TakeMove();
		return Move;
	}
	return NOMOVE;
}