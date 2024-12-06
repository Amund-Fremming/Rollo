using Microsoft.AspNetCore.SignalR;

namespace infrastructure
{
    public class SpinHub(IGameUserList gameUserList, ILogger<SpinHub> logger) : Hub
    {
        private const string STATE = nameof(STATE);
        private const string MESSAGE = nameof(MESSAGE);

        private readonly IGameUserList gameUserList = gameUserList;
        private readonly ILogger<SpinHub> _logger = logger;

        public async Task Subscribe(string userId, string gameId)
        {
            var success = gameUserList.Add(gameId, userId);
            if (!success)
            {
                await Clients.Caller.SendAsync(MESSAGE, "Game does not exist.");
                _logger.LogError("Game does not exist.");
            }

            if (success)
            {
                await Groups.AddToGroupAsync(Context.ConnectionId, gameId);
                await Clients.Group(gameId).SendAsync(MESSAGE, "Joined game successfully.");
                _logger.LogInformation("Joined game.");
            }
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