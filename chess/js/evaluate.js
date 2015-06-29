var PawnTable = [    0,    0,    0,    0,    0,    0,    0,    0,
				    10,   10,    0,  -10,  -10,    0,   10,   10,
				     5,    0,    0,    5,    5,    0,    0,    5,
				     0,    0,   10,   20,   20,   10,    0,    0,
				     5,    5,    5,   10,   10,    5,    5,    5,
				    10,   10,   10,   20,   20,   10,   10,   10,
				    20,   20,   20,   30,   30,   20,   20,   20,
				     0,    0,    0,    0,    0,    0,    0,    0  ];

var KnightTable = [  0,  -10,    0,    0,    0,    0,  -10,    0,
				     0,    0,    0,    5,    5,    0,    0,    0,
				     0,    0,   10,   10,   10,   10,    0,    0,
				     0,    0,   10,   20,   20,   10,    5,    0,
				     5,   10,   15,   20,   20,   15,   10,    5,
				     5,   10,   10,   20,   20,   10,   10,    5,
				     0,    0,    5,   10,   10,    5,    0,    0,
				     0,    0,    0,    0,    0,    0,    0,    0  ];

var BishopTable = [  0,    0,  -10,    0,    0,  -10,    0,    0,
				     0,    0,    0,   10,   10,    0,    0,    0,
				     0,    0,   10,   15,   15,   10,    0,    0,
				     0,   10,   15,   20,   20,   15,   10,    0,
				     0,   10,   15,   20,   20,   15,   10,    0,
				     0,    0,   10,   15,   15,   10,    0,    0,
				     0,    0,    0,   10,   10,    0,    0,    0,
				     0,    0,    0,    0,    0,    0,    0,    0  ];

var RookTable = [    0,    0,    5,   10,   10,    5,    0,    0,
				     0,    0,    5,   10,   10,    5,    0,    0,
				     0,    0,    5,   10,   10,    5,    0,    0,
				     0,    0,    5,   10,   10,    5,    0,    0,
				     0,    0,    5,   10,   10,    5,    0,    0,
				     0,    0,    5,   10,   10,    5,    0,    0,
				    25,   25,   25,   25,   25,   25,   25,   25,
				     0,    0,    5,   10,   10,    5,    0,    0  ];

var BishopPair = 40;

function EvalPosition() {

	var score = GameBoard.material[COLOURS.WHITE] - GameBoard.material[COLOURS.BLACK];

	var piece;
	var sq;
	var pieceNum;

	piece = PIECES.wP;
	for (pieceNum = 0; pieceNum < GameBoard.pieceNum[piece]; ++pieceNum) {
		sq = GameBoard.pList[PIECEINDEX(piece, pieceNum)];
		score += PawnTable[SQ64(sq)];
	}

	piece = PIECES.bP;
	for (pieceNum = 0; pieceNum < GameBoard.pieceNum[piece]; ++pieceNum) {
		sq = GameBoard.pList[PIECEINDEX(piece, pieceNum)];
		score -= PawnTable[MIRROR64(SQ64(sq))];
	}

	piece = PIECES.wN;
	for (pieceNum = 0; pieceNum < GameBoard.pieceNum[piece]; ++pieceNum) {
		sq = GameBoard.pList[PIECEINDEX(piece, pieceNum)];
		score += KnightTable[SQ64(sq)];
	}

	piece = PIECES.bN;
	for (pieceNum = 0; pieceNum < GameBoard.pieceNum[piece]; ++pieceNum) {
		sq = GameBoard.pList[PIECEINDEX(piece, pieceNum)];
		score -= KnightTable[MIRROR64(SQ64(sq))];
	}

	piece = PIECES.wB;
	for (pieceNum = 0; pieceNum < GameBoard.pieceNum[piece]; ++pieceNum) {
		sq = GameBoard.pList[PIECEINDEX(piece, pieceNum)];
		score += BishopTable[SQ64(sq)];
	}

	piece = PIECES.bB;
	for (pieceNum = 0; pieceNum < GameBoard.pieceNum[piece]; ++pieceNum) {
		sq = GameBoard.pList[PIECEINDEX(piece, pieceNum)];
		score -= BishopTable[MIRROR64(SQ64(sq))];
	}

		piece = PIECES.wR;
	for (pieceNum = 0; pieceNum < GameBoard.pieceNum[piece]; ++pieceNum) {
		sq = GameBoard.pList[PIECEINDEX(piece, pieceNum)];
		score += RookTable[SQ64(sq)];
	}

	piece = PIECES.bR;
	for (pieceNum = 0; pieceNum < GameBoard.pieceNum[piece]; ++pieceNum) {
		sq = GameBoard.pList[PIECEINDEX(piece, pieceNum)];
		score -= RookTable[MIRROR64(SQ64(sq))];
	}

	piece = PIECES.wQ;
	for (pieceNum = 0; pieceNum < GameBoard.pieceNum[piece]; ++pieceNum) {
		sq = GameBoard.pList[PIECEINDEX(piece, pieceNum)];
		score += RookTable[SQ64(sq)];
	}

	piece = PIECES.bQ;
	for (pieceNum = 0; pieceNum < GameBoard.pieceNum[piece]; ++pieceNum) {
		sq = GameBoard.pList[PIECEINDEX(piece, pieceNum)];
		score -= RookTable[MIRROR64(SQ64(sq))];
	}

	if (GameBoard.pieceNum[PIECES.wB] >= 2) {
		score += BishopPair;
	}

	if (GameBoard.pieceNum[PIECES.bB] >= 2) {
		score -= BishopPair;
	}

	if (GameBoard.side == COLOURS.WHITE) {
		return score;
	}
	else {
		return -score;
	}
}