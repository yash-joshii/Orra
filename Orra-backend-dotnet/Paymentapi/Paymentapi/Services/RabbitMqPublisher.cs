using RabbitMQ.Client;
using System.Text;
using System.Text.Json;

namespace Paymentapi.Services
{
    public class RabbitMqPublisher
    {
        private readonly IConfiguration _configuration;

        public RabbitMqPublisher(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task PublishPaymentSuccessAsync(object messageObject)
        {
            var factory = new ConnectionFactory
            {
                HostName = _configuration["RabbitMQ:HostName"] ?? "localhost",
                Port = int.Parse(_configuration["RabbitMQ:Port"] ?? "5672"),
                UserName = _configuration["RabbitMQ:UserName"] ?? "guest",
                Password = _configuration["RabbitMQ:Password"] ?? "guest"
            };

            using var connection = await factory.CreateConnectionAsync();
            using var channel = await connection.CreateChannelAsync();

            var messageJson = JsonSerializer.Serialize(messageObject);
            var body = Encoding.UTF8.GetBytes(messageJson);

            await channel.BasicPublishAsync(
                exchange: "payment.exchange",
                routingKey: "payment.success",
                body: body
            );
        }
    }
}