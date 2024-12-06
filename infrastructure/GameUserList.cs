using System.Collections.Concurrent;

namespace infrastructure
{
    public interface IGameUserList
    {
        bool AddUserToGame(string userId, string gameId);
        bool AddGame(string userId, string gameId);
    }

    public class GameUserList : IGameUserList
    {
        private ConcurrentDictionary<string, List<string>> map;

        public GameUserList()
        {
            map = new ConcurrentDictionary<string, List<string>>();
        }

        public bool AddUserToGame(string gameId, string userId)
        {
            var gameExists = map.TryGetValue(gameId, out _);
            if (!gameExists)
                return false;

            map[gameId].Add(userId);
            return true;
        }

        public bool AddGame(string gameId, string userId)
        {
            return map.TryAdd(gameId, [userId]);
        }

        // Må ha noe for å fjerne game fra dette galskapet
    }
}