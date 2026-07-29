using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

namespace Paymentapi.Services
{
    public class RazorPayService
    {
        private readonly HttpClient _httpClient;
        private readonly string _keyId;
        private readonly string _keySecret;

        public RazorPayService(IConfiguration configuration)
        {
            _keyId = configuration["Razorpay:KeyId"] ?? throw new Exception("Razorpay KeyId missing");
            _keySecret = configuration["Razorpay:KeySecret"] ?? throw new Exception("Razorpay KeySecret missing");

            _httpClient = new HttpClient
            {
                BaseAddress = new Uri("https://api.razorpay.com/v1/")
            };

            var authToken = Convert.ToBase64String(Encoding.ASCII.GetBytes($"{_keyId}:{_keySecret}"));
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", authToken);
        }

        public async Task<string> CreateOrderAsync(double amount, string currency, string receipt)
        {
            // Razorpay expects amount in the smallest currency unit (paise for INR)
            var amountInPaise = (int)(amount * 100);

            var payload = new
            {
                amount = amountInPaise,
                currency = currency,
                receipt = receipt,
                payment_capture = 1 // auto-capture payment
            };

            var jsonPayload = JsonSerializer.Serialize(payload);
            var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync("orders", content);
            var responseBody = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                throw new Exception($"Razorpay order creation failed: {responseBody}");
            }

            return responseBody;
        }
    }
}
