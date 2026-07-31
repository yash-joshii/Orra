
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Protocols;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;
using Paymentapi.Consumers;
using Paymentapi.Data;
using Paymentapi.Services;

namespace Paymentapi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);


            var supabaseProjectUrl = "https://jnizlhfupndwxuujpgku.supabase.co";
            var jwksUrl = $"{supabaseProjectUrl}/auth/v1/.well-known/jwks.json";


            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
            options.RequireHttpsMetadata = true;
            options.MapInboundClaims = false;
            options.ConfigurationManager = new ConfigurationManager<OpenIdConnectConfiguration>(
                jwksUrl,
                new JwksOnlyConfigurationRetriever(),
                new HttpClient()
            );

            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidAlgorithms = new[] { "ES256" }
            };

            options.Events = new JwtBearerEvents
            {
                OnMessageReceived = context =>
                {
                    if (context.Request.Cookies.ContainsKey("sb-access-token"))
                    {
                        context.Token = context.Request.Cookies["sb-access-token"];
                    }
                    return Task.CompletedTask;
                },
                OnAuthenticationFailed = context =>
                {
                    Console.WriteLine("JWT validation failed: " + context.Exception.Message);
                    return Task.CompletedTask;
                },
                OnChallenge = context =>
                {
                    Console.WriteLine("Challenge triggered: " + context.Error + " - " + context.ErrorDescription);
                    return Task.CompletedTask;
                }
            };
        });

            builder.Services.AddAuthorization();


            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
            builder.Services.AddOpenApi();

            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseNpgsql(builder.Configuration.GetConnectionString("SupabaseConnection"),
                    npgsqlOptions => npgsqlOptions.EnableRetryOnFailure(
                        maxRetryCount: 3,
                        maxRetryDelay: TimeSpan.FromSeconds(5),
                        errorCodesToAdd: null)));



            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowReactApp", policy =>
                {
                    policy.WithOrigins("http://localhost:5173")
                          .AllowAnyHeader()
                          .AllowAnyMethod()
                          .AllowCredentials();
                });
            });
            builder.Services.AddScoped<RabbitMqPublisher>();
            builder.Services.AddScoped<RazorPayService>();
            builder.Services.AddHostedService<BookingConfirmedConsumer>();
            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
            }

            app.UseHttpsRedirection();

            app.UseCors("AllowReactApp");   

            app.UseAuthentication();
            app.UseAuthorization();     



            app.MapControllers();

            app.Run();
        }
    }
}
