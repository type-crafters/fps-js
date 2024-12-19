using DotNetEnv;
using WebFPS.src.Injectables;
using WebFPS.src.Repositories;
using WebFPS.src.Services;
using WebFPS.src.Util;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

Env.Load();
builder.Services.AddCors((options) =>
{
    options.AddPolicy("AllowOrigins", (policy) =>
    {
        policy.WithOrigins("http://localhost:5173/")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();

    }); // TODO CHANGE
});
builder.Services.AddControllers();
builder.Services.AddSingleton<MongoDbContext>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IPasswordService, PasswordService>();
builder.Services.AddScoped<IJWTService, JWTService>();


WebApplication app = builder.Build();

app.UseCors("AllowOrigins");
app.MapControllers();
app.MapGet("/", () => Results.Content("<h1>RubielGOD</h1>", "text/html"));

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.Run();