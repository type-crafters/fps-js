namespace WebFPS.src.Util;

public class Range<T>(T min, T max) where T : IComparable<T>, IConvertible
{
    private readonly T _min = min;
    private readonly T _max = max;
    private T _value = min;

    /// <summary>
    /// Sets the starting value for the range object.
    /// </summary>
    /// <param name="val"></param>
    /// <returns>The same Range object that called the method, with the updated value.</returns>
    public Range<T> WithDefaultValue(T val)
    {
        Value = val;
        return this;
    }
    public T Value
    {
        get => _value;
        set
        {
            decimal val = Convert.ToDecimal(value);
            decimal min = Convert.ToDecimal(_min);
            decimal max = Convert.ToDecimal(_max);

            _value = (T)Convert.ChangeType(Math.Clamp(val, min, max), typeof(T));
        }
    } 
}