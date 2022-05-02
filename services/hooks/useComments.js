import { useMutation } from 'react-query'
import { createComment, deleteComment } from '../queries/comments'

const useComments = () => {
  const writeComment = useMutation((data) => createComment(data))
  const removeComment = useMutation((data) => deleteComment(data))
  return {
    writeComment,
    removeComment
  }
}
export default useComments
