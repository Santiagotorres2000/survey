
-- TABLA: Company
CREATE TABLE company (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    nit VARCHAR(50) NOT NULL,
    address VARCHAR(200)
);

-- TABLA: Survey
CREATE TABLE survey (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    company_id INT NOT NULL,
    CONSTRAINT fk_survey_company
        FOREIGN KEY (company_id) REFERENCES company(id)
);

-- TABLA: Question
CREATE TABLE question (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    type VARCHAR(50) NOT NULL,
    survey_id INT NOT NULL,
    CONSTRAINT fk_question_survey
        FOREIGN KEY (survey_id) REFERENCES survey(id)
);

-- TABLA: OptionItem
CREATE TABLE option_item (
    id SERIAL PRIMARY KEY,
    label VARCHAR(100) NOT NULL,
    question_id INT NOT NULL,
    CONSTRAINT fk_optionitem_question
        FOREIGN KEY (question_id) REFERENCES question(id)
);

-- TABLA: Person
CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(50),
    role VARCHAR(50),
    status VARCHAR(50),
    password_hash TEXT NOT NULL,
    company_id INT NOT NULL,
    CONSTRAINT fk_person_company
        FOREIGN KEY (company_id) REFERENCES company(id)
);

-- TABLA: Respondent
CREATE TABLE respondent (
    id SERIAL PRIMARY KEY,
    phone VARCHAR(50),
    email VARCHAR(150)
);

-- TABLA: Response
CREATE TABLE response (
    id SERIAL PRIMARY KEY,
    answer_text TEXT,

    respondent_id INT NOT NULL,
    question_id INT NOT NULL,
    option_item_id INT,

    CONSTRAINT fk_response_respondent
        FOREIGN KEY (respondent_id) REFERENCES respondent(id),
    CONSTRAINT fk_response_question
        FOREIGN KEY (question_id) REFERENCES question(id),
    CONSTRAINT fk_response_optionitem
        FOREIGN KEY (option_item_id) REFERENCES option_item(id)
);
