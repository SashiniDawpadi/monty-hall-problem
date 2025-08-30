namespace server.Models;

public record SimulationResult(
    int Games,
    bool SwitchDoor,
    int Wins,
    int Losses,
    double WinRatePercent
);
