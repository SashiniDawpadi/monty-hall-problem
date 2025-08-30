using System;
namespace server.Services;

public class MontyHallSimulator : IMontyHallSimulator
{
    private readonly Random _rng = new();

    public (int wins, int losses) Run(int games, bool switchDoor)
    {
        int wins = 0, losses = 0;
        for (int i = 0; i < games; i++)
        {
            int prizeDoor = _rng.Next(0,3);
            int playerPick = _rng.Next(0,3);

            int hostOpens = Enumerable.Range(0,3)
              .First(d => d != playerPick && d != prizeDoor);

            int finalPick = playerPick;
            if (switchDoor)
            {
                finalPick = Enumerable.Range(0, 3)
                    .First(d => d != playerPick && d != hostOpens);
            }
            if (finalPick == prizeDoor) wins++; else losses++;
        }
          return (wins, losses);
    }
}