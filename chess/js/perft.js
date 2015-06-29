var perft_leafnodes;

function Perft(depth) {
	if (depth == 0) {
		perft_leafnodes++;
		return;
	}

	GenerateMoves();
	//rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1

	var index;
	var move;

	for (index = GameBoard.moveListStart[GameBoard.ply]; index < GameBoard.moveListStart[GameBoard.ply + 1]; ++index) {
		move = GameBoard.moveList[index];

		if (MakeMove(move) == BOOL.FALSE) {
			continue;
		}

		Perft(depth - 1);
		TakeMove();
	}

	return;
}

function PerftTest(depth) {
	PrintBoard();
	console.log("Starting Test To Depth : " + depth);
	perft_leafnodes = 0;
	GenerateMoves();
	var index;
	var move;
	var moveNum = 0;

	for (index = GameBoard.moveListStart[GameBoard.ply]; index < GameBoard.moveListStart[GameBoard.ply + 1]; ++index) {

		move = GameBoard.moveList[index];

		if (MakeMove(move) == BOOL.FALSE) {
			continue;
		}

		moveNum++;
		var sumnodes = perft_leafnodes;
		Perft(depth - 1);
		TakeMove();
		var oldnodes = perft_leafnodes - sumnodes;
		console.log("move : " + moveNum + " " + PrintMove(move) + " " + oldnodes);

	}
	console.log("Test Complete : " + perft_leafnodes + " leaf nodes visited.")
	return;
}