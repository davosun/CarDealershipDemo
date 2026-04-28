IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
CREATE TABLE [dbo].[car] (
    [id] uniqueidentifier NOT NULL,
    [created_dt] datetime2 NOT NULL DEFAULT (getutcdate()),
    [modified_dt] datetime2 NOT NULL DEFAULT (getutcdate()),
    [active_in] bit NOT NULL DEFAULT (1),
    [mfr_nm] varchar(50) NOT NULL,
    [model_yr] int NOT NULL,
    [color_nm] varchar(10) NOT NULL,
    [color_hex_cd] char(7) NOT NULL,
    [mileage_qty] int NOT NULL,
    [price_amt] money NOT NULL,
    [drivetrain_cd] char(3) NOT NULL,
    [sunroof_in] bit NOT NULL,
    [power_windows_in] bit NOT NULL,
    [navigation_in] bit NOT NULL,
    [heated_seats_in] bit NOT NULL,
    CONSTRAINT [PK_car] PRIMARY KEY NONCLUSTERED ([id])
);

CREATE CLUSTERED INDEX [IX_car_created_dt_id] ON [dbo].[car] ([created_dt], [id]);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20260424085417_InitialCreate', N'10.0.7');

COMMIT;
GO

BEGIN TRANSACTION;
DECLARE @var nvarchar(max);
SELECT @var = QUOTENAME([d].[name])
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[dbo].[car]') AND [c].[name] = N'modified_dt');
IF @var IS NOT NULL EXEC(N'ALTER TABLE [dbo].[car] DROP CONSTRAINT ' + @var + ';');
ALTER TABLE [dbo].[car] ADD DEFAULT (current_timestamp) FOR [modified_dt];

DECLARE @var1 nvarchar(max);
SELECT @var1 = QUOTENAME([d].[name])
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[dbo].[car]') AND [c].[name] = N'created_dt');
IF @var1 IS NOT NULL EXEC(N'ALTER TABLE [dbo].[car] DROP CONSTRAINT ' + @var1 + ';');
ALTER TABLE [dbo].[car] ADD DEFAULT (current_timestamp) FOR [created_dt];

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20260426170246_UseTimestampDefaultValue', N'10.0.7');

COMMIT;
GO

