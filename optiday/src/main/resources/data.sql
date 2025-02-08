-- 역할(Role) 데이터 추가
INSERT INTO roles (name) VALUES
    ('ROLE_ADMIN'),
    ('ROLE_USER');

-- Members
INSERT INTO member (username, message, birthdate, phone) VALUES
    ('min', 'Hello!', '1990-01-01', '010-1234-5678'),
    ('su', 'Hi there!', '1985-05-20', '010-5678-1234'),
    ('alex', 'Goong!', '1992-07-15', '010-1111-2222'),
    ('emma', 'Nicet you!', '1995-03-30', '010-3333-4444'),
    ('john', 'How  you?', '1988-09-10', '010-5555-6666'),
    ('lisa', 'Welc!', '1991-06-25', '010-7777-8888'),
    ('david', 'Hav great day!', '1987-12-12', '010-9999-0000'),
    ('sarah', 'Goovening!', '1993-04-18', '010-1234-9999'),
    ('kevin', 'Staafe!', '1996-08-22', '010-5678-1111'),
    ('olivia', 'Seou soon!', '1994-02-05', '010-3333-5555'),
    ('james', 'Enjyour day!', '1990-10-28', '010-7777-2222'),
    ('mia', 'Lets ch up!', '1989-11-14', '010-9999-3333'),
    ('noah', 'Be hy!', '1984-07-07', '010-4444-6666'),
    ('sophia', 'Hafun!', '1997-01-23', '010-6666-8888'),
    ('liam', 'Takere!', '1986-06-16', '010-2222-4444'),
    ('ava', 'You r!', '1998-09-09', '010-8888-0000'),
    ('ben', 'Lets t up!', '1999-03-27', '010-5555-7777'),
    ('grace', 'Gre!', '1991-12-31', '010-1111-9999'),
    ('chris', 'Gook!', '1995-05-11', '010-3333-2222'),
    ('zoe', 'Call r!', '1983-04-02', '010-6666-9999'),
    ('nate', 'See yoon!', '1982-08-19', '010-0000-1111'),
    ('ella', 'Enjoy ent!', '1996-11-05', '010-2222-6666'),
    ('ryan', 'Smile as!', '1994-01-12', '010-4444-7777'),
    ('harry', 'Staive!', '1980-02-28', '010-7777-3333'),
    ('lily', 'You ang!', '1993-07-04', '010-9999-5555'),
    ('jack', 'Good nly!', '1981-10-22', '010-1234-0000'),
    ('emily', 'Trust ylf!', '1985-05-18', '010-5678-2222'),
    ('daniel', 'Stayated!', '1989-09-29', '010-7777-6666'),
    ('hannah', 'Believelf!', '1992-12-10', '010-8888-1111'),
    ('lucas', 'Always d', '1997-03-03', '010-5555-4444');

-- 사용자(User) 데이터 추가
-- 비밀번호는 Bcrypt로 암호화한 값
INSERT INTO users (email, password, member_id) VALUES
    ('min@naver.com', '$2a$10$xSU78Fir4hS31pSvmPQNN.LRKG09R/3z1uaMyFiaE09FOo2c3fInm',1), -- "min"
    ('su@naver.com', '$2a$10$TLqeQY1WO4sptc08YphLbu7w/rPZjqIKT6dpvP4exJYl8l9XTimha',2); -- "su"

-- 사용자와 역할 관계 추가 (user_roles 테이블)
INSERT INTO user_roles (user_id, role_id) VALUES
    (1, 1), -- min -> ROLE_ADMIN
    (2, 2); -- su -> ROLE_USER





-- Categories
INSERT INTO category (name, color, member_id) VALUES
  ('일', '#FFB3BA', 1), -- Pastel Red
  ('개인', '#FFDFBA', 1), -- Pastel Orange
  ('쇼핑', '#FFFFBA', 1), -- Pastel Yellow
  ('건강', '#BAFFC9', 1), -- Pastel Green
  ('회사', '#BAE1FF', 1), -- Pastel Blue
  ('여행', '#E2BAFF', 1), -- Pastel Purple
  ('음식', '#FFC4E1', 1), -- Pastel Pink
  ('스포츠', '#B3E5FC', 1), -- Light Blue
  ('음악', '#C8E6C9', 1), -- Light Green
  ('영화', '#FFF9C4', 1), -- Light Yellow
  ('책', '#D1C4E9', 1); -- Light Purple

-- Todos
INSERT INTO todo (title, description, start_date, end_date, is_completed, member_id, category_id) VALUES
    ('연말 회의', '연말을 맞아 진행되는 회의입니다.', '2024-12-28', '2024-12-29', false, 1, 1),
    ('송년회', '올해의 마지막 송년회입니다.', '2024-12-30', '2024-12-31', false, 1, 3),
    ('회의', '새해 첫 회의입니다.', '2025-01-01', '2025-01-03', false, 1, 11),
    ('달리기', '신년 달리기 행사입니다.', '2025-01-04', '2025-01-05', false, 1, NULL),
    ('회의', '팀 회의입니다.', '2025-01-07', '2025-01-08', false, 1, 4),
    ('회의', '중요한 회의입니다.', '2025-01-01', '2025-01-03', false, 1, 2),
    ('개발 회의', '개발 팀 회의입니다.', '2025-01-09', '2025-01-10', false, 1, NULL),
    ('디자인 검토', '디자인 검토 회의입니다.', '2025-01-11', '2025-01-12', false, 1, 6),
    ('팀 빌딩', '팀 빌딩 활동입니다.', '2025-01-13', '2025-01-14', false, 1, 3),
    ('고객 미팅', '고객과의 미팅입니다.', '2025-01-15', '2025-01-16', false, 1, 4),
    ('프로젝트 계획', '프로젝트 계획 회의입니다.', '2025-01-17', '2025-01-18', false, 1, NULL),
    ('테스트', '프로젝트 테스트 기간입니다.', '2025-01-10', '2025-01-20', false, 1, 7),
    ('여행 계획', '주변 찾아보기', '2025-01-21', '2025-01-22', false, 1, 1),
    ('회고', '팀 회고 회의입니다.', '2025-01-23', '2025-01-24', false, 1, 8),
    ('전략 회의', '전략 회의입니다.', '2025-01-25', '2025-01-26', false, 1, 4),
    ('교육 세션', '신입 교육 세션입니다.', '2025-01-27', '2025-01-28', false, 1, 10),
    ('신년 계획', '신년 계획 수립 회의입니다.', '2025-02-01', '2025-02-02', false, 1, 1),
    ('마케팅 회의', '마케팅 전략 회의입니다.', '2025-02-05', '2025-02-06', false, 1, NULL);

-- Follow
INSERT INTO follow ( follower_id, following_id, created_at) VALUES
    (1,2,'2025-01-01T10:00:00'),
    (2,1,'2025-01-01T10:00:00'),
    (3,1,'2025-01-01T10:00:00'),
    (4,1,'2025-01-01T10:00:00');


