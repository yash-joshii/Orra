using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Paymentapi.Models
{
    [Table("transactions")]
    public class Transaction
    {
        [Key]
        [Column("transaction_id")]
        public long TransactionId { get; set; }

        [Column("booking_id")]
        public long? BookingId { get; set; }

        [Required]
        [Column("amount")]
        public double Amount { get; set; }

        [Required]
        [Column("type")]
        public string Type { get; set; } = "PAYMENT";

        [Required]
        [Column("status")]
        public string Status { get; set; } = "pending";

        [Column("payment_gateway_ref")]
        public string? PaymentGatewayRef { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
