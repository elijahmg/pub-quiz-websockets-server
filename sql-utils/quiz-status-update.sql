-- Creates trigger for local development
-- Data shape must correspond to useTeamQuizDataStore
CREATE or REPLACE FUNCTION public.quiz_status_trigger_function() returns trigger AS $$
Declare
    begin
        perform pg_notify(cast('update_quiz_status' AS text), json_build_object(
	'id', qB.id, 'status', qB.status,
	'currentQuestion', json_build_object('id', q.id, 'content', q.content, 'mediaType', q."mediaType", 'mediaURL', q."mediaURL", 'round', json_build_object('id', r.id, 'name', r.name)))::text)
from "QuizStatus" qB
inner join public."Question" q on qB."currentQuestionId" = q.id
inner join public."Round" r on q."roundId" = r.id
where qB.id=NEW.id limit 1;
        return new;
    end;
$$ language plpgsql;

CREATE or REPLACE TRIGGER quiz_status_trigger AFTER update or insert on "QuizStatus"
FOR each row execute procedure quiz_status_trigger_function();