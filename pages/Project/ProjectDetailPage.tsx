import Topbar from "@/components/bar/Topbar";
import { projectActions } from "@/redux/slices/projectSlice";
import { RootState, useAppDispatch } from "@/store";
import { verticalScale } from "@/themes/Metrics";
import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

interface ProjectDetailProps {
  id: string | string[];
}

const ProjectDetailPage: React.FC<ProjectDetailProps> = ({ id }) => {
  const dispatch = useAppDispatch();

  const { projectDetailInformation } = useSelector(
    (state: RootState) => state.project
  );

  useEffect(() => {
    dispatch(projectActions.setProjectDetailInformation(id));
  }, []);

  return (
    <View style={styles.container}>
      <Topbar />
      <Text>Project Detail Page</Text>
      {projectDetailInformation && (
        <ScrollView style={styles.scrollView}>
          <View style={styles.scrollContainer}>
            <Text>Id: {projectDetailInformation.id}</Text>
            <Text>Başlık: {projectDetailInformation.title}</Text>
            <Text>Detay: {projectDetailInformation.detail}</Text>
            <Text>Müşteri: {projectDetailInformation.customer}</Text>
            <Text>Durum: {projectDetailInformation.status}</Text>
            <Text>Fiyat: {projectDetailInformation.price}</Text>
            <Text>
              Malzeme Ücreti: {projectDetailInformation.material_cost}
            </Text>
            <Text>
              Oluşturma Tarihi: {projectDetailInformation.create_date}
            </Text>
            <Text>Başlama Tarihi: {projectDetailInformation.start_date}</Text>
            <Text>Bitiş Tarihi: {projectDetailInformation.finish_date}</Text>
            <Text>Ödenen Miktar: {projectDetailInformation.paid_amount}</Text>
            <Text>Alınacak Miktar: {projectDetailInformation.debt_amount}</Text>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  scrollView: {
    width: "100%",
  },
  scrollContainer: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: verticalScale(120),
  },
});

export default ProjectDetailPage;
