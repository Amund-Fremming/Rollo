using System.Collections.Concurrent;

namespace infrastructure.src
{
    public interface IGameUserList
    {
        bool AddUserToGame(string userId, string gameId);

        bool AddGame(string userId, string gameId);
    }

    public class GameUserList : IGameUserList
    {
        private ConcurrentDictionary<string, ConcurrentBag<string>> map;

        public GameUserList()
        {
            map = new ConcurrentDictionary<string, ConcurrentBag<string>>();
        }

        public bool AddUserToGame(string userId, string gameId)
        {
            if (!map.TryGetValue(gameId, out var userList))
            {
                return false;
            }

            userList.Add(userId);
            return true;
        }

        public bool AddGame(string userId, string gameId)
        {
            return map.TryAdd(gameId, [userId]);
        }
    }
}