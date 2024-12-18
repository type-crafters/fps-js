using WebFPS.src.Entities.Enums;
using WebFPS.src.Util;

namespace WebFPS.src.Entities.Structs;

public struct ControlOptions
{
    public Range<int> mouseSensitivity;
    public Range<float> ADSSensitivity;
    public Range<float> precisionScopeSensitivity;
    public InteractionType sprintInteraction;
    public InteractionType crouchInteraction;
    public InteractionType proneInteraction;
    public InteractionType ADSInteraction;
    public InteractionType equipmentInteraction;
    public Dictionary<PlayerAction, KeyBind> keybinds;
}