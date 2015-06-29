function PIECEINDEX (piece, pieceNum) {
	return (piece * 10 + pieceNum);
}

var GameBoard = {};

GameBoard.pieces = new Array(BRD_SQ_NUM);
GameBoard.side = COLOURS.WHITE;
GameBoard.fiftyMove = 0;
GameBoard.hisPly = 0;
GameBoard.history = [];
GameBoard.ply = 0;
GameBoard.enPas = 0;
GameBoard.castlePerm = 0;
GameBoard.material = new Array(2);
GameBoard.pieceNum = new Array(13);
GameBoard.pList = new Array(140);
GameBoard.posKey = 0;

GameBoard.moveList = new Array(MAXDEPTH * MAXPOSITIONMOVES);
GameBoard.moveScores = new Array(MAXDEPTH * MAXPOSITIONMOVES);
GameBoard.moveListStart = new Array(MAXDEPTH);
GameBoard.PvTable = [];
GameBoard.PvArray = new Array(MAXDEPTH);
GameBoard.searchHistory = new Array( 14 * BRD_SQ_NUM);
GameBoard.searchKillers = new Array( 3 * MAXDEPTH);

function CheckBoard() {
	var t_pieceNumber = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
	var t_material = [ 0, 0 ];
	var sq64, t_piece, t_piece_Number, sq120, colour, pCount;

	for (t_piece = PIECES.wP; t_piece <= PIECES.bK; ++t_piece) {
		for (t_piece_Number = 0; t_piece_Number < GameBoard.pieceNum[t_piece]; ++t_piece_Number) {
			sq120 = GameBoard.pList[PIECEINDEX(t_piece, t_piece_Number)];
			if (GameBoard.pieces[sq120] != t_piece) {
				console.log("Error: Piece Lists (:t_piece)");
				return BOOL.FALSE;
			}
		}
	}

	for (sq64 = 0; sq64 < 64; ++sq64) {
		sq120 = SQ120(sq64);
		t_piece = GameBoard.pieces[sq120];
		t_pieceNumber[t_piece]++;
		t_material[PieceCol[t_piece]] += PieceVal[t_piece];
	}

	for (t_piece = PIECES.wP; t_piece <= PIECES.bK; ++t_piece) {
		if (t_pieceNumber[t_piece] != GameBoard.pieceNum[t_piece]) {
			console.log("Error: Piece Lists (:t_pieceNumber)");
			return BOOL.FALSE;
		}
	}	

	if (t_material[COLOURS.WHITE] != GameBoard.material[COLOURS.WHITE] ||
		t_material[COLOURS.BLACK] != GameBoard.material[COLOURS.BLACK]) {
			console.log("Error: Piece Colours (:t_material)");
			return BOOL.FALSE;
	}	

	if (GameBoard.side != COLOURS.WHITE && GameBoard.side != COLOURS.BLACK) {
			console.log("Error: Turn Side (:GameBoard.side)");
			return BOOL.FALSE;
	}

	if (GeneratePosKey() != GameBoard.posKey) {
			console.log("Error: Position Key (:GameBoard.posKey)");
			return BOOL.FALSE;
	}
	return BOOL.TRUE;
}



function PrintBoard() {

	var sq, file, rank, piece;

	console.log("\nGame Board:\n");

	for (rank = RANKS.RANK_8; rank >= RANKS.RANK_1; rank--) {
		var line = (RankChar[rank] + " ");
		for (file = FILES.FILE_A; file <= FILES.FILE_H; file++) {
			sq = FRtoSQ(file, rank);
			piece = GameBoard.pieces[sq];
			line += (" " + PieceChar[piece] + " ");
		}
		console.log(line);
	}

	console.log("");
	var line = "  ";

	for(file = FILES.FILE_A; file <= FILES.FILE_H; file++) {
		line += (" " + FileChar[file] + " ");
	}

	console.log(line);
	console.log("Side : " + SideChar[GameBoard.side]);
	console.log("EnPas : " + GameBoard.enPas);
	line = "";

	if (GameBoard.castlePerm & CASTLEBIT.WKCA) line += "K";
	if (GameBoard.castlePerm & CASTLEBIT.WQCA) line += "Q";
	if (GameBoard.castlePerm & CASTLEBIT.BKCA) line += "k";
	if (GameBoard.castlePerm & CASTLEBIT.BQCA) line += "q";
	console.log("Castle : " + line);
	console.log("Key : " + GameBoard.posKey.toString(16));
}


function GeneratePosKey() {

	var sq = 0;
	var finalKey = 0;
	var piece = PIECES.EMPTY;

	for (sq = 0; sq < BRD_SQ_NUM; ++sq) {
		piece = GameBoard.pieces[sq];
		if (piece != PIECES.EMPTY && piece != SQUARES.OFFBOARD) {
			finalKey ^= PieceKeys[(piece * 120) + sq];
		}
	}

	if (GameBoard.side == COLOURS.WHITE) {
		finalKey ^= SideKey;
	}

	if (GameBoard.enPas != SQUARES.NO_SQ) {
		finalKey ^= PieceKeys[GameBoard.enPas];
	}

	finalKey ^= CastleKeys[GameBoard.castlePerm];

	return finalKey;

}

function PrintPieceList() {

	var piece, pieceNum;

	for (piece = PIECES.wP; piece <= PIECES.bK; ++ piece) {
		for (pieceNum = 0; pieceNum < GameBoard.pieceNum[piece]; ++pieceNum) {
			console.log("Piece " + PieceChar[piece] + " on " + PrintSq(GameBoard.pList[PIECEINDEX(piece, pieceNum)]));
		}
	}

}

function UpdateListsMaterial() {

	var piece, sq, index, colour;

	for (index = 0; index < 140; ++index) {
		GameBoard.pList[index] = PIECES.EMPTY;
	}

	for (index = 0; index < 2; ++index) {
		GameBoard.material[index] = 0;
	}

	for (index = 0; index < 13; ++index) {
		GameBoard.pieceNum[index] = 0;
	}

	for (index = 0; index < 64; ++index) {
		sq = SQ120(index);
		piece = GameBoard.pieces[sq];
		if(piece != PIECES.EMPTY) {
			colour = PieceCol[piece];
			GameBoard.material[colour] += PieceVal[piece];
			GameBoard.pList[PIECEINDEX(piece, GameBoard.pieceNum[piece])] = sq;
			GameBoard.pieceNum[piece]++;
		}
	}

	//PrintPieceList();
}


function ResetBoard() {

	var index = 0;

	for (index = 0; index < BRD_SQ_NUM; ++index) {
		GameBoard.pieces[index] = SQUARES.OFFBOARD; 
	}

	for (index = 0; index < 64; ++index) {
		GameBoard.pieces[SQ120(index)] = PIECES.EMPTY;
	}

	GameBoard.side = COLOURS.BOTH;
	GameBoard.enPas = SQUARES.NO_SQ;
	GameBoard.fiftyMove = 0;
	GameBoard.ply = 0;
	GameBoard.hisPly = 0;
	GameBoard.castlePerm = 0;
	GameBoard.posKey = 0;
	GameBoard.moveListStart[GameBoard.ply] = 0;

}

function ParseFen(fen) {

	ResetBoard();

	var rank = RANKS.RANK_8;
	var file = FILES.FILE_A;
	var piece = 0;
	var count = 0;
	var i = 0;
	var sq120 = 0;
	var fenCount = 0;

	while ((rank >= RANKS.RANK_1) && fenCount < fen.length) {
		count = 1;
		switch (fen[fenCount]) {
			case "p" : piece = PIECES.bP; break;
			case "r" : piece = PIECES.bR; break;
			case "n" : piece = PIECES.bN; break;
			case "b" : piece = PIECES.bB; break;
			case "k" : piece = PIECES.bK; break;
			case "q" : piece = PIECES.bQ; break;
			case "P" : piece = PIECES.wP; break;
			case "R" : piece = PIECES.wR; break;
			case "N" : piece = PIECES.wN; break;
			case "B" : piece = PIECES.wB; break;
			case "K" : piece = PIECES.wK; break;
			case "Q" : piece = PIECES.wQ; break;

			case "1" :
			case "2" :
			case "3" :
			case "4" :
			case "5" :
			case "6" :
			case "7" :
			case "8" :
				piece = PIECES.EMPTY;
				count = fen[fenCount].charCodeAt() - '0'.charCodeAt();
				break;

			case "/" :
			case " " :
				rank--;
				file = FILES.FILE_A;
				fenCount++;
				continue;

			default:
				console.log("FEN error");
				return;
		}

		for (i = 0; i < count; i++) {
			sq120 = FRtoSQ(file, rank);
			GameBoard.pieces[sq120] = piece;
			file++;
		}
		fenCount++;
	}

	GameBoard.side = (fen[fenCount] == "w") ? COLOURS.WHITE : COLOURS.BLACK;
	fenCount += 2;

	for (i = 0; i < 4; i++) {
		if (fen[fenCount] == " ") {
			break;
		}
		switch(fen[fenCount]) {
			case "K" : GameBoard.castlePerm |= CASTLEBIT.WKCA; break;
			case "Q" : GameBoard.castlePerm |= CASTLEBIT.WQCA; break;
			case "k" : GameBoard.castlePerm |= CASTLEBIT.BKCA; break;
			case "q" : GameBoard.castlePerm |= CASTLEBIT.BQCA; break;
			default : break;
		}
		fenCount++;
	}
	fenCount++;

	if (fen[fenCount] != "-") {
		file = fen[fenCount].charCodeAt() - "a".charCodeAt();
		rank = fen[fenCount + 1].charCodeAt() - "1".charCodeAt();
		console.log("fen[fenCount] : " + fen[fenCount] + " File : " + file + " Rank : " + rank);
		GameBoard.enPas = FRtoSQ(file, rank);
	}

	GameBoard.posKey = GeneratePosKey();
	UpdateListsMaterial();
	//PrintSqAttacked();
}

function PrintSqAttacked() {

	var sq, file, rank, piece;

	console.log("\nAttacked :\n");

	for (rank = RANKS.RANK_8; rank >= RANKS.RANK_1; rank--) {
		var line = ((rank + 1) + "  ");
		for (file = FILES.FILE_A; file <= FILES.FILE_H; file++) {
			sq = FRtoSQ(file, rank);
			if (SqAttacked(sq, GameBoard.side^1) == BOOL.TRUE) piece = "X";
			else piece = "-";
			line += (" " + piece + " ");
		}
		console.log(line);
	}
	console.log("");
}


function SqAttacked(sq, side) {
	var piece;
	var t_sq;
	var index;

	if (side == COLOURS.WHITE) {
		if (GameBoard.pieces[sq - 11] == PIECES.wP || GameBoard.pieces[sq - 9] == PIECES.wP) {
			return BOOL.TRUE;
		}
	} 
	else {
		if (GameBoard.pieces[sq + 11] == PIECES.bP || GameBoard.pieces[sq + 9] == PIECES.bP) {
			return BOOL.TRUE;
		}
	}

	for (index = 0; index < 8; index++) {
		piece = GameBoard.pieces[sq + KnDir[index]];
		if (piece != SQUARES.OFFBOARD && PieceCol[piece] == side && PieceKnight[piece] == BOOL.TRUE) {
			return BOOL.TRUE;
		}
	}

	for (index = 0; index < 4; ++index) {
		dir = RkDir[index];
		t_sq = sq + dir;
		piece = GameBoard.pieces[t_sq];
		while (piece != SQUARES.OFFBOARD) {
			if (piece != PIECES.EMPTY) {
				if (PieceRookQueen[piece] == BOOL.TRUE && PieceCol[piece] == side) {
					return BOOL.TRUE;
				}
				break;
			}
			t_sq += dir;
			piece = GameBoard.pieces[t_sq];
		}
	}

	for (index = 0; index < 4; ++index) {
		dir = BiDir[index];
		t_sq = sq + dir;
		piece = GameBoard.pieces[t_sq];
		while (piece != SQUARES.OFFBOARD) {
			if (piece != PIECES.EMPTY) {
				if (PieceBishopQueen[piece] == BOOL.TRUE && PieceCol[piece] == side) {
					return BOOL.TRUE;
				}
				break;
			}
			t_sq += dir;
			piece = GameBoard.pieces[t_sq];
		}
	}

	for (index = 0; index < 8; index++) {
		piece = GameBoard.pieces[sq + KiDir[index]];
		if (piece != SQUARES.OFFBOARD && PieceCol[piece] == side && PieceKing[piece] == BOOL.TRUE) {
			return BOOL.TRUE;
		}
	}

	return BOOL.FALSE;

}