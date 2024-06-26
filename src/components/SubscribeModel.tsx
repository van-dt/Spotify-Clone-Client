import Modal from "@/src/components/Modal";
import Button from "./Button";
import useSubscribeModal from "@/hooks/useSubscribeModel";

const SubscribeModel = () => {
  //  TODO: uncomment when stripe is implemented
  // let content = <div className="text-center">No products available</div>;
  const subscribeModal = useSubscribeModal();
  const onChange = (open: boolean) => {
    if (!open) {
      subscribeModal.onClose();
    }
  };

  return (
    <Modal
      title="Only for premium user"
      description="Listen to music with Premium"
      isOpen={subscribeModal.isOpen}
      onChange={onChange}
    >
      <Button>Subscribe for $9 a month</Button>
    </Modal>
  );
};

export default SubscribeModel;
