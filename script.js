document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('verificationForm');
    const verifyButton = form.querySelector('button[type="submit"]');
    const studentNameInput = document.getElementById('studentName');
    const certificateIDInput = document.getElementById('certificateID');
    const resultModal = new bootstrap.Modal(document.getElementById('resultModal'));
    const modalBody = document.getElementById('modalBody');

    // Function to check if all fields are filled
    function checkFormValidity() {
        const isFormValid = studentNameInput.value.trim() !== '' && certificateIDInput.value.trim() !== '';
        verifyButton.disabled = !isFormValid;
        verifyButton.classList.toggle('btn-disabled', !isFormValid); // Optional, add disabled styling
    }

    // Add event listeners to inputs
    studentNameInput.addEventListener('input', checkFormValidity);
    certificateIDInput.addEventListener('input', checkFormValidity);

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const studentName = studentNameInput.value.trim();
        const certificateID = certificateIDInput.value.trim();

        try {
            const response = await fetch('http://localhost:3000/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ student_name: studentName, certificate_id: certificateID })
            });

            const data = await response.json();

            if (data.status === 'success') {
                modalBody.innerHTML = `
                    <div class="icon-container success-icon icon-animation">
                        <i class="fa fa-check-circle"></i>
                    </div>
                    <p>Verification status:</p>
                    <p>Student Name: ${studentName}</p>
                    <p>Certificate ID: ${certificateID}</p>
                    <p>Verified By: ${data.verified_by}</p>`;
            } else {
                modalBody.innerHTML = `
                    <div class="icon-container error-icon icon-animation">
                        <i class="fa fa-times-circle"></i>
                    </div>
                    <p>Verification failed:</p>
                    <p>User details do not match. Please check the details and try again.</p>`;
            }

            resultModal.show(); // Show the modal
        } catch (error) {
            console.error('Error:', error);
            modalBody.innerHTML = `
                <div class="icon-container error-icon icon-animation">
                    <i class="fa fa-times-circle"></i>
                </div>
                <p>An error occurred while verifying the certificate. Please try again.</p>`;
            resultModal.show(); // Show the modal
        }
    });

    // Reset the form when the modal is hidden
    document.getElementById('resultModal').addEventListener('hidden.bs.modal', () => {
        form.reset(); // Reset the form fields
        checkFormValidity(); // Ensure the button state is updated after reset
    });

    // Initial check to disable the button if fields are empty on page load
    checkFormValidity();
});
