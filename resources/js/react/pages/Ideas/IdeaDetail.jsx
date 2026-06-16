import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";

import { api } from "../../lib/api";
import { useUser } from "../../context/UserContext";

export default function IdeaDetail() {
    const { id } = useParams();
    const { activeUser } = useUser();
    const queryClient = useQueryClient();
    const [commentBody, setCommentBody] = useState("");

    const { data: comments, isPending } = useQuery({
        queryKey: ["comments", id],
        queryFn: () => api.getComments(id),
    });

    const addCommentMutation = useMutation({
        mutationFn: () => api.addComment(id, commentBody, activeUser?.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments", id] });
            queryClient.invalidateQueries({ queryKey: ["ideas", activeUser?.id] });
            setCommentBody("");
        },
    });

    return (
        <Box sx={{ maxWidth: 800, mx: "auto" }}>
            <Typography variant="h6" gutterBottom>
                Comments
            </Typography>

            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        placeholder="Add a comment..."
                        value={commentBody}
                        onChange={(e) => setCommentBody(e.target.value)}
                        disabled={!activeUser}
                    />
                    <Button
                        sx={{ mt: 1 }}
                        variant="contained"
                        disabled={!commentBody.trim() || !activeUser}
                        onClick={() => addCommentMutation.mutate()}
                    >
                        Post Comment
                    </Button>
                </CardContent>
            </Card>

            {isPending ? (
                <CircularProgress />
            ) : (
                <Stack spacing={2}>
                    {comments?.map((comment) => (
                        <Card key={comment.id}>
                            <CardContent>
                                <Typography variant="body1">
                                    {comment.body}
                                </Typography>
                                <Divider sx={{ my: 1 }} />
                                <Typography variant="caption" color="text.secondary">
                                    {comment.author} · {new Date(comment.created_at).toLocaleDateString()}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                    {comments?.length === 0 && (
                        <Typography color="text.secondary">
                            No comments yet. Be the first!
                        </Typography>
                    )}
                </Stack>
            )}
        </Box>
    );
}