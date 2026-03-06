INSERT INTO `society_hood`.`soceitymembers`
(`id`,
`user_id`,
`society_id`,
`flat_id`,
`role`,
`created_at`,
`created_by`,
`updated_at`,
`updated_by`)
VALUES
(UUID(),
'8b62c96e-4c29-4ed1-81a2-7892a370c032',
'2a155217-c451-4e2b-a595-d464b6c4ccf1',
'33812259-1976-11f1-b364-c89665f1a53d',
1,
CURRENT_TIMESTAMP,
'5ef39361-1974-11f1-b364-c89665f1a53d',
CURRENT_TIMESTAMP,
'5ef39361-1974-11f1-b364-c89665f1a53d');
SELECT * FROM society_hood.soceitymembers;