$(function() {
	init();
	console.log("Main Init Called");
	ParseFen(START_FEN);
	PrintBoard();
});

function InitFilesRanksBrd() {
	
	var index = 0;
	var file = FILES.FILE_A;
	var rank = RANKS.RANK_1;
	var sq = SQUARES.A1;
	
	for(index = 0; index < BRD_SQ_NUM; ++index) {
		FilesBrd[index] = SQUARES.OFFBOARD;
		RanksBrd[index] = SQUARES.OFFBOARD;
	}
	
	for(rank = RANKS.RANK_1; rank <= RANKS.RANK_8; ++rank) {
		for(file = FILES.FILE_A; file <= FILES.FILE_H; ++file) {
			sq = FRtoSQ(file, rank);
			FilesBrd[sq] = file;
			RanksBrd[sq] = rank;
		}
	}
}

function InitHashKeys() {
	var index = 0;

	for (index = 0; index < 14 * 120; ++index) {
		PieceKeys[index] = RAND_32();
	}

	SideKey = RAND_32();

	for (index = 0; index < 16; ++index) {
		CastleKeys[index] = RAND_32();
	}
}

function InitSq120to64() {
	var index = 0;
	var file = FILES.FILE_A;
	var rank = RANKS.RANK_1;
	var sq = SQUARES.A1;
	var sq64 = 0;

	for (index = 0; index < BRD_SQ_NUM; ++index) {
		Sq120to64[index] = 65; 
	}

	for (index = 0; index < 64; ++index) {
		Sq64to120[index] = 120; 
	}

	for (rank = RANKS.RANK_1; rank <= RANKS.RANK_8; ++rank) {
		for (file = FILES.FILE_A; file <= FILES.FILE_H; ++file) {
			sq = FRtoSQ(file, rank);
			Sq64to120[sq64] = sq;
			Sq120to64[sq] = sq64;
			sq64++;
		}
	}
}

function init() {
	console.log("init() called");
	InitFilesRanksBrd();
	InitHashKeys();
	InitSq120to64();
}