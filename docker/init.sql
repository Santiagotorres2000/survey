CREATE TABLE company (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    nit VARCHAR(255),
    address VARCHAR(255)
);

CREATE TABLE person (
    id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255),
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(255),
    role VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'ACTIVO',
    password_hash VARCHAR(255) NOT NULL,
    company_id BIGINT,
    CONSTRAINT fk_company FOREIGN KEY (company_id) REFERENCES company(id) ON DELETE SET NULL
);

CREATE TABLE survey (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    company_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_survey_company FOREIGN KEY (company_id) REFERENCES company(id) ON DELETE CASCADE
);

CREATE TABLE question (
    id BIGSERIAL PRIMARY KEY,
    text VARCHAR(255) NOT NULL,
    survey_id BIGINT NOT NULL,
    type VARCHAR(50) NOT NULL,
    CONSTRAINT fk_question_survey FOREIGN KEY (survey_id) REFERENCES survey(id) ON DELETE CASCADE
);

CREATE TABLE option_item (
    id BIGSERIAL PRIMARY KEY,
    label VARCHAR(255) NOT NULL,
    question_id BIGINT NOT NULL,
    CONSTRAINT fk_option_item_question FOREIGN KEY (question_id) REFERENCES question(id) ON DELETE CASCADE
);

CREATE TABLE respondent (
    id BIGSERIAL PRIMARY KEY,
    phone VARCHAR(255),
    email VARCHAR(255),
    survey_id BIGINT NOT NULL,
    CONSTRAINT fk_respondent_survey FOREIGN KEY (survey_id) REFERENCES survey(id) ON DELETE CASCADE
);

CREATE TABLE response (
    id BIGSERIAL PRIMARY KEY,
    respondent_id BIGINT NOT NULL,
    question_id BIGINT NOT NULL,
    answer_text TEXT,
    option_item_id BIGINT,
    responded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_response_respondent FOREIGN KEY (respondent_id) REFERENCES respondent(id) ON DELETE CASCADE,
    CONSTRAINT fk_response_question FOREIGN KEY (question_id) REFERENCES question(id) ON DELETE CASCADE,
    CONSTRAINT fk_response_option_item FOREIGN KEY (option_item_id) REFERENCES option_item(id) ON DELETE SET NULL
);
