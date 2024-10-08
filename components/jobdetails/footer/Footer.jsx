import Ionicons from '@expo/vector-icons/Ionicons';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SIZES } from '../../../constants';
import { showToast } from '../../../utils';
import { applyForJob } from '../../../utils/firebaseAuth';
import styles from "./footer.style";
const Footer = ({ url, onLike, isLiked, isApplied, jobId, isEmployerPage, hideBookmark }) => {


  const handleLikeButtonPress = () => {
    onLike();
  };

  const handleApply = async () => {
    if (isEmployerPage) {
      await applyForJob(jobId);
    } {
      if (url) {
        await Linking.openURL(url);
      } else {
        showToast("No link provided or the link has expired");
      }
    }
  };
  return (
    <View style={styles.container}>
      {!hideBookmark && <TouchableOpacity style={styles.likeBtn} onPress={handleLikeButtonPress} >
        {
          isLiked ?
            <Ionicons name="bookmark" size={32} color="#6EACDA" />
            :
            <Ionicons name="bookmark-outline" size={32} color="#6EACDA" />
        }
      </TouchableOpacity>}

      <TouchableOpacity
        style={isApplied ? styles2.appliedBtn : styles.applyBtn}
        onPress={handleApply}
      >
        <Text style={styles.applyBtnText}>{isApplied ? "Already Applied! " : "Apply for job"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;

const styles2 = StyleSheet.create({
  appliedBtn: {
    flex: 1,
    backgroundColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: SIZES.medium,
  },
})
