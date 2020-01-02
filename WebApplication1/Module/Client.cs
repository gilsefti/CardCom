using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Module
{
    public class Client
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        [Required]
        public string IDC { get; set; }
        [Required]
        public string Name { get; set; }
        public string Email { get; set; }

        [Required]
        public DateTime? BirthDate { get; set; }
        public string Gender { get; set; }
        public string Phone { get; set; }
    }
}
