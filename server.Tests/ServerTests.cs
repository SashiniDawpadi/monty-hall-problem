using server.Services;
using Xunit;

public class ServerTests
{
    [Fact]
    public void Switching_Should_Win_About_Two_Thirds()
    {
        var sim = new MontyHallSimulator();
        var (wins, losses) = sim.Run(100_000, true);
        double winRate = wins / 100_000.0;
        Assert.InRange(winRate, 0.63, 0.69);
    }

    [Fact]
    public void Staying_Should_Win_About_One_Third()
    {
        var sim = new MontyHallSimulator();
        var (wins, losses) = sim.Run(100_000, false);
        double winRate = wins / 100_000.0;
        Assert.InRange(winRate, 0.31, 0.37);
    }
}
