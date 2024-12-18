using WebFPS.src.Util;

namespace WebFPS.src.Entities.Structs;

public struct AudioOptions
{
    public bool muteAudio;
    public Range<int> masterVolume;
    public Range<int> musicVolume;
    public Range<int> sfxVolume;
}