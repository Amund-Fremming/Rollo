using infrastructure;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSignalR();
builder.Services.AddSingleton<IGameUserList, GameUserList>();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();
app.MapHub<SpinHub>("/spinhub");

app.Run();