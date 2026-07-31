using Microsoft.IdentityModel.Protocols;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;

namespace Paymentapi
{
    public class JwksOnlyConfigurationRetriever : IConfigurationRetriever<OpenIdConnectConfiguration>
    {

        public async Task<OpenIdConnectConfiguration> GetConfigurationAsync(
      string address, IDocumentRetriever retriever, CancellationToken cancel)
        {
            var json = await retriever.GetDocumentAsync(address, cancel);
            var jwks = new JsonWebKeySet(json);

            var config = new OpenIdConnectConfiguration
            {
                JsonWebKeySet = jwks
            };

            foreach (var key in jwks.Keys)  
            {
                config.SigningKeys.Add(key);
            }

            return config;
        }
    }
}
