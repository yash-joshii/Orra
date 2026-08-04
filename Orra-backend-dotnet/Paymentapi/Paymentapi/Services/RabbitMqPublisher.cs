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
                Uri = new Uri(_configuration["RabbitMQ:Url"]!)
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