namespace WebFPS.src.Entities;

public class UserPreferenceEntity(string userId)
{
    public string UserId { get; set; } = userId;
    public ControlsSettings Controls { get; set; } = new ControlsSettings();
    public AudioSettings Audio { get; set; } = new AudioSettings();
    public UISettings UI { get; set; } = new UISettings();
    public AccountSettings Account { get; set; } = new AccountSettings();

    public class ControlsSettings
    {
        public double MouseSensitivity { get; set; } = 3;
        public double ADSSensitivity { get; set; } = 2.5;
        public double PrecisionScopeSensitivity { get; set; } = 2.5;

        public InteractionType SprintInteraction { get; set; } = InteractionType.Toggle;
        public InteractionType CrouchInteraction { get; set; } = InteractionType.Hold;
        public InteractionType ProneInteraction { get; set; } = InteractionType.Hold;
        public InteractionType ADSInteraction { get; set; } = InteractionType.Toggle;
        public InteractionType EquipmentInteraction { get; set; } = InteractionType.Toggle;

        public Dictionary<string, string> Keybinds { get; set; } = [];
    }

    public class AudioSettings
    {
        private bool _muteAudio;
        public bool MuteAudio
        {
            get => _muteAudio;
            set => _muteAudio = value;
        }

        private int _masterVolume = 100;
        public int MasterVolume
        {
            get => _masterVolume;
            set => _masterVolume = Math.Clamp(value, 0, 100);
        }

        private int _musicVolume = 100;
        public int MusicVolume
        {
            get => _musicVolume;
            set => _musicVolume = Math.Clamp(value, 0, 100);
        }

        private int _sfxVolume = 100;
        public int SFXVolume
        {
            get => _sfxVolume;
            set => _sfxVolume = Math.Clamp(value, 0, 100);
        }
    }

    public class UISettings
    {
        public StyleChoice Crosshair { get; set; } = StyleChoice.Detailed;
        public StyleChoice HitMarker { get; set; } = StyleChoice.Detailed;
        public DisplayChoice HealthBars { get; set; } = DisplayChoice.All;
        public DisplayChoice PlayerUsernames { get; set; } = DisplayChoice.All;
    }

    public class AccountSettings
    {
        public FriendRequestPolicy FriendRequests { get; set; } = FriendRequestPolicy.FriendsOfFriends;
        public SavePreferencePolicy SavePreferences { get; set; } = SavePreferencePolicy.OnTheCloud;
    }

    public enum InteractionType : byte { Toggle, Hold }
    public enum StyleChoice : byte { None, Simple, Detailed }
    public enum DisplayChoice : byte { Disabled, AlliesOnly, EnemiesOnly, All }
    public enum FriendRequestPolicy : byte { Disabled, FriendsOfFriends, RecentlyPlayedWith, Public }
    public enum SavePreferencePolicy : byte { Locally, OnTheCloud }
}
