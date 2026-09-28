# Sports questions

## Build
- Add a translated question section after the Sports listings with a large text field, submit button, loading state, and answer area.
- Send the question, selected language, and the currently displayed SportSG facilities to a server-only AI function.
- Instruct the AI to answer in one or two short sentences, only from the supplied facilities, in the selected language.
- Return the required translated fallback when the supplied data does not answer the question.

## Technical details
- Use the existing SportSG result objects as the only reference data sent with each question.
- Keep the model call and secret on the server through Lovable AI, using `openai/gpt-6-astra` on the Responses API.
- Validate the request, prevent empty or duplicate submissions, and show safe translated errors without clearing the question.
- Preserve the current Sports cards and every other page unchanged.

## Verify
- Test an answer grounded in a listed venue and an unsupported question that triggers the fallback.
- Check the form, loading state, and response language in English, Chinese, Malay, and Tamil on mobile.
- Confirm every AI request succeeds and the app remains healthy.
