using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Services;

namespace server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SimulationsController : ControllerBase
{
    private readonly IMontyHallSimulator _sim;

    public SimulationsController(IMontyHallSimulator sim) => _sim = sim;

    [HttpPost]
    public ActionResult<SimulationResult> Post(SimulationRequest request)
    {
        if (request.Games <= 0 || request.Games > 5_000_000)
            return BadRequest("Games must be between 1 and 5,000,000.");

        var (wins, losses) = _sim.Run(request.Games, request.SwitchDoor);
        var result = new SimulationResult(
            request.Games,
            request.SwitchDoor,
            wins,
            losses,
            request.Games == 0 ? 0 : (wins * 100.0 / request.Games)
        );
        return Ok(result);
    }
}
