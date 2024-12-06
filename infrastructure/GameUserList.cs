using System.Collections.Concurrent;

namespace infrastructure
{
    public interface IGameUserList
    {
        bool Add(string userId, string gameId);
    }

    public class GameUserList : IGameUserList
    {
        private ConcurrentDictionary<string, List<string>> map;

        public GameUserList()
        {
            map = new ConcurrentDictionary<string, List<string>>();
        }

        public bool Add(string gameId, string userId)
        {
            var gameExists = map.TryGetValue(gameId, out _);
            if (!gameExists)
                return false;

            map[gameId].Add(userId);
            return true;
        }

        // Må ha noe for å fjerne dette galskapet
    }
}