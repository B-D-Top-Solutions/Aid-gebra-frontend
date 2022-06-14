<template>CLASSES HERE</template>

<script>
import axios from "axios";
// import auth from '../../utils/authHeader'

export default {
  name: "student-dashboard",
  components: {},
  // data() {
  //   return {
  //     code: null,
  //     list: [],
  //   };
  // },
  // mounted() {
  //   auth("student");
  //   this.myClass();
  // },
  // methods: {
  //   async joinClass() {
  //     try {
  //       const entry = await axios.post(
  //         import.meta.env.VITE_SERVER +
  //           import.meta.env.VITE_API_STUDENT_JOINCLASS +
  //           "/" +
  //           this.code
  //       );

  //       const res = entry.data;
  //       console.log(res);
  //       if (!res.status) throw res.error;

  //       alert("Your request to join this class is sent!");
  //       this.myClass();
  //     } catch (error) {
  //       console.log(error);
  //       alert(error);
  //     }
  //   },
  //   async myClass() {
  //     try {
  //       const entry = await axios.get(
  //         import.meta.env.VITE_SERVER +
  //           import.meta.env.VITE_API_STUDENT_CLASS +
  //           "?enrolledOnly=true"
  //       );

  //       const res = entry.data;
  //       console.log(res);
  //       if (!res.status) throw res.error;
  //       this.list = res.data;
  //     } catch (error) {
  //       console.log(error);
  //       alert(error);
  //     }
  //   },
  // },
};
</script>
