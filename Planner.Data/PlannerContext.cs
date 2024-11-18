using System;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Planner.Data.Entities;
using Action = Planner.Data.Entities.Action;

namespace Planner.Data
{
    public partial class PlannerContext : IdentityDbContext<Account>
    {
        public PlannerContext(DbContextOptions<PlannerContext> options)
            : base(options)
        {
            // Ensure migrations are used for database creation.
        }

        public virtual DbSet<Account> Accounts { get; set; } = null!;
        public virtual DbSet<Action> Actions { get; set; } = null!;
        public virtual DbSet<Area> Areas { get; set; } = null!;
        public virtual DbSet<Contact> Contacts { get; set; } = null!;
        public virtual DbSet<Project> Projects { get; set; } = null!;
        public virtual DbSet<Tag> Tags { get; set; } = null!;
        public virtual DbSet<TrashAction> TrashActions { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure Action entity
            modelBuilder.Entity<Action>(entity =>
            {
                entity.ToTable("Actions");
                entity.Property(e => e.CreatedDate).HasColumnType("timestamp");
                entity.Property(e => e.DueDate).HasColumnType("date");
                entity.Property(e => e.ScheduledDate).HasColumnType("date");
                entity.Property(e => e.Notes).HasMaxLength(1000); // Add constraint
                entity.Property(e => e.Text).HasMaxLength(500).IsRequired();
                entity.Property(e => e.Energy);
                entity.Property(e => e.State);
                entity.Property(e => e.IsDone).IsRequired();

                entity.HasOne(d => d.Account)
                    .WithMany(p => p.Actions)
                    .HasForeignKey(d => d.AccountId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(p => p.WaitingContact)
                    .WithMany(p => p.WaitingActions)
                    .HasForeignKey(d => d.WaitingContactId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(d => d.Project)
                    .WithMany(p => p.Actions)
                    .HasForeignKey(d => d.ProjectId)
                    .OnDelete(DeleteBehavior.SetNull);

                entity.HasMany(d => d.Areas)
                    .WithMany(p => p.Actions);

                entity.HasMany(d => d.Tags)
                    .WithMany(p => p.Actions);

                entity.HasMany(d => d.Contacts)
                    .WithMany(p => p.Actions);
            });

            // Configure Area entity
            modelBuilder.Entity<Area>(entity =>
            {
                entity.ToTable("Areas");
                entity.Property(e => e.Name).HasMaxLength(100).IsRequired();
                entity.Property(e => e.Color).HasMaxLength(7); // For color codes like #FFFFFF

                entity.HasOne(d => d.Account)
                    .WithMany(p => p.Areas)
                    .HasForeignKey(d => d.AccountId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // Configure Contact entity
            modelBuilder.Entity<Contact>(entity =>
            {
                entity.ToTable("Contacts");
                entity.Property(e => e.Name).HasMaxLength(100).IsRequired();
                entity.Property(e => e.Color).HasMaxLength(7);

                entity.HasOne(d => d.Account)
                    .WithMany(p => p.Contacts)
                    .HasForeignKey(d => d.AccountId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // Configure Project entity
            modelBuilder.Entity<Project>(entity =>
            {
                entity.ToTable("Projects");
                entity.Property(e => e.CreatedDate).HasColumnType("timestamp");
                entity.Property(e => e.DueDate).HasColumnType("date");
                entity.Property(e => e.Name).HasMaxLength(200).IsRequired();
                entity.Property(e => e.Notes).HasMaxLength(1000);

                entity.HasOne(d => d.Account)
                    .WithMany(p => p.Projects)
                    .HasForeignKey(d => d.AccountId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // Configure Tag entity
            modelBuilder.Entity<Tag>(entity =>
            {
                entity.ToTable("Tags");
                entity.Property(e => e.Name).HasMaxLength(50).IsRequired();
                entity.Property(e => e.Color).HasMaxLength(7);

                entity.HasOne(d => d.Account)
                    .WithMany(p => p.Tags)
                    .HasForeignKey(d => d.AccountId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // Configure TrashAction entity
            modelBuilder.Entity<TrashAction>(entity =>
            {
                entity.ToTable("TrashActions");
                entity.Property(e => e.Name).HasMaxLength(200).IsRequired();

                entity.HasOne(d => d.Account)
                    .WithMany(p => p.TrashActions)
                    .HasForeignKey(d => d.AccountId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // Apply base class configurations
            base.OnModelCreating(modelBuilder);
            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
