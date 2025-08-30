namespace server.Services;

public interface IMontyHallSimulator
{
    (int wins, int losses) Run(int games, bool switchDoor);
}
