package exception;

public class apiException extends RuntimeException {
    public apiException(String message) {
        super(message);
    }
}
