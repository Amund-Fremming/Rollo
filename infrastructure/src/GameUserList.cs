using System.Collections.Concurrent;

namespace infrastructure.src
{
    public interface IGameUserList
    {
        bool AddUserToGame(string gameId, string userId);

        bool AddGame(string gameId, string userId);
    }

    public class GameUserList : IGameUserList
    {
        private ConcurrentDictionary<string, ConcurrentBag<string>> map;

        public GameUserList()
        {
            map = new ConcurrentDictionary<string, ConcurrentBag<string>>();
        }

        public bool AddUserToGame(string gameId, string userId)
        {
            if (!map.TryGetValue(gameId, out var userList))
            {
                return false;
            }

            userList.Add(userId);
            return true;
        }

        public bool AddGame(string gameId, string userId)
        {
            return map.TryAdd(gameId, [userId]);
        }
    }
}