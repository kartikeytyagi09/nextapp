import UserModel from '@/model/user';
import { getServerSession } from 'next-auth/next';
import dbConnect from '@/lib/db';
import { User } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/options';

export async function DELETE(
  req: Request,
  { params }: { params: { messageId: string } } // ✅ match folder name exactly
) {
  const messageId = params.messageId; // ✅ capital "I"
  await dbConnect();

  const session = await getServerSession(authOptions);
  const _user: User = session?.user;

  if (!session || !_user) {
    return Response.json(
      { success: false, message: 'Not authenticated' },
      { status: 401 }
    );
  }

  const userId = _user._id;

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $pull: { messages: { _id: messageId } } },
      { new: true }
    );

    if (!updatedUser) {
      return Response.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    return Response.json(
      { success: true, message: 'Message deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting message:', error);
    return Response.json(
      { success: false, message: 'Error deleting message' },
      { status: 500 }
    );
  }
}
