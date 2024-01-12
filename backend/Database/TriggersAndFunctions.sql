-- A function to create an index every time an insert has happend 

CREATE OR REPLACE FUNCTION create_index_on_email()
RETURNS TRIGGER AS $$
BEGIN
    EXECUTE 'CREATE INDEX IF NOT EXISTS idx_email ON emails(dest)';
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- A trigger that will run create_index_on_email functino every time a new insert operation is performed


CREATE TRIGGER trigger_create_index_on_email
AFTER INSERT ON emails
EXECUTE FUNCTION create_index_on_email();

