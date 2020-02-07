import { useState } from 'react';

function useCaseEditor(caseEditorOptions) {
  const { isVisible, caseId } = caseEditorOptions;

  const [showCaseEditor, setShowCaseEditor] = useState(isVisible);
  const [userCaseId, setUserCaseId] = useState(caseId);

  function setUseCaseEditor({ isVisible, caseId }) {
    setShowCaseEditor(isVisible);
    setUserCaseId(caseId);
  }

  return [{ showCaseEditor, userCaseId }, setUseCaseEditor];
}

export default useCaseEditor;
