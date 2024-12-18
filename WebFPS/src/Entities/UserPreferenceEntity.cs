using System.Linq.Expressions;
using WebFPS.src.Entities.Enums;
using WebFPS.src.Entities.Structs;
using WebFPS.src.Util;

namespace WebFPS.src.Entities;

public class UserPreferenceEntity
{
    public ControlOptions controls;
    public AudioOptions audio;
    public InterfaceOptions ui;
    public AccountOptions account;

    public static readonly UserPreferenceEntity defaultUserPreferences = new()
    {
        controls = new()
        {
            mouseSensitivity = new Range<int>(1, 5).WithDefaultValue(3),
            ADSSensitivity = new Range<float>(0.1f, 5.0f).WithDefaultValue(2.5f),
            precisionScopeSensitivity = new Range<float>(0.1f, 5.0f).WithDefaultValue(2.5f),
            sprintInteraction = InteractionType.Hold,
            crouchInteraction = InteractionType.Toggle,
            proneInteraction = InteractionType.Toggle,
            ADSInteraction = InteractionType.Hold,
            equipmentInteraction = InteractionType.Hold,
            keybinds = []
        },
        audio = new()
        {
            muteAudio = false,
            masterVolume = new Range<int>(0, 100).WithDefaultValue(100),
            musicVolume = new Range<int>(0, 100).WithDefaultValue(100),
            sfxVolume = new Range<int>(0, 100).WithDefaultValue(100)
        },
        ui = new()
        {
            crosshair = StyleChoice.Detailed,
            hitMarker = StyleChoice.Detailed,
            healthBars = DisplayChoice.All,
            playerUsernames = DisplayChoice.All
        },
        account = new() {
            friendRequests = FriendRequestsFrom.Anyone,
            savePreferences = SavePreferences.OnTheCloud
        }
    };
}