namespace CarDealershipDemo.Core.Entities
{
    public interface IEntity
    {
        Guid Id { get; set; }
        DateTime CreatedDate { get; set; }
        DateTime ModifiedDate { get; set; }
        bool IsActive { get; set; }
    }
}
