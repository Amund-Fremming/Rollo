using Microsoft.AspNetCore.SignalR;

namespace infrastructure.src
{
    public class SpinHub(IGameUserList gameUserList, ILogger<SpinHub> logger) : Hub
    {
        private const string GAME_STATE = nameof(GAME_STATE);
        private const string MESSAGE = nameof(MESSAGE);

        private const string START = nameof(START);
        private const string LOBBY = nameof(LOBBY);
        private const string SPINNER = nameof(SPINNER);

        private readonly IGameUserList gameUserList = gameUserList;
        private readonly ILogger<SpinHub> _logger = logger;

        public async Task Subscribe(string gameId, string userId)
        {
            var success = gameUserList.AddUserToGame(gameId, userId);
            if (!success)
            {
                await Clients.Caller.SendAsync(MESSAGE, "Game does not exist.");
                _logger.LogError("Game does not exist.");
                return;
            }

            await Groups.AddToGroupAsync(Context.ConnectionId, gameId);
            await Clients.Group(gameId).SendAsync(MESSAGE, $"Joined game with id {gameId}");
            await Clients.Group(gameId).SendAsync(GAME_STATE, LOBBY);
            _logger.LogInformation($"Joined game with id {gameId}");
        }

        public async Task CreateGame(string gameId, string userId)
        {
            var success = gameUserList.AddGame(gameId, userId);
            if (!success)
            {
                await Clients.Caller.SendAsync(MESSAGE, "Failed to create game.");
                _logger.LogError("Failed to create game.");
                return;
            }

            await Groups.AddToGroupAsync(Context.ConnectionId, gameId);
            await Clients.Group(gameId).SendAsync(GAME_STATE, LOBBY);
            await Clients.Caller.SendAsync(MESSAGE, $"Game created with id {gameId}");
            _logger.LogInformation($"Joined game with id {gameId}");
        }

        //public async Task InitializeGame(string userId, string gameId)
        //{
        //    await Clients.All.SendAsync("ReceiveMessage", user, message);
        //}

        //public async Task StartSpin(string userId, string gameId)
        //{
        //    await Clients.All.SendAsync("ReceiveMessage", user, message);
        //}
    }
}