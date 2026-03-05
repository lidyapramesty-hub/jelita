'use client'

import { Modal, Text, Button, Group, Stack, ThemeIcon } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'

interface DeleteConfirmModalProps {
    opened: boolean
    onClose: () => void
    onConfirm: () => void
    deleting: boolean
}

export default function DeleteConfirmModal({ opened, onClose, onConfirm, deleting }: DeleteConfirmModalProps) {
    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title=""
            size="sm"
            radius="lg"
            centered
            withCloseButton={false}
        >
            <Stack align="center" gap="md" py="md">
                <ThemeIcon size={56} radius="xl" variant="light" color="red">
                    <IconTrash size={28} />
                </ThemeIcon>
                <div className="text-center">
                    <Text size="lg" fw={700}>Hapus Usaha?</Text>
                    <Text size="sm" c="dimmed" mt="xs">
                        Data usaha akan dihapus dari sistem. Tindakan ini tidak dapat dibatalkan.
                    </Text>
                </div>
                <Group gap="md" mt="sm">
                    <Button variant="default" onClick={onClose} radius="lg" disabled={deleting}>
                        Batal
                    </Button>
                    <Button
                        color="red"
                        onClick={onConfirm}
                        loading={deleting}
                        radius="lg"
                        leftSection={<IconTrash size={16} />}
                    >
                        Hapus
                    </Button>
                </Group>
            </Stack>
        </Modal>
    )
}
